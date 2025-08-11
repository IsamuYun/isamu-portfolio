/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const repoFromCI = (() => {
  const full = process.env.GITHUB_REPOSITORY;
  const parts = full?.split("/");
  return parts && parts.length === 2 ? parts[1] : null;
})();

const ownerFromCI = (() => {
  const full = process.env.GITHUB_REPOSITORY;
  const parts = full?.split("/");
  return parts && parts.length === 2 ? parts[0] : null;
})();

const isUserSiteRepo = ownerFromCI && repoFromCI 
                        && repoFromCI.toLowerCase() ===  `${ownerFromCI.toLowerCase()}.github.io`;

// 如果设置了 BASE_PATH 环境变量，则以它为准；否则：
// - 用户主页仓库 -> 空前缀
// - 项目页仓库 -> /repo-name
const computedBasePath = process.env.BASE_PATH
  ? process.env.BASE_PATH
  : isUserSiteRepo
  ? ""
  : repoFromCI
  ? `/${repoFromCI}`
  : "";

// 只有生产环境才加前缀；开发环境一律为空，避免本地路径不便
const basePath = isProd ? computedBasePath : "";
const assetPrefix = basePath ? `${basePath}/` : "";
                        
const nextConfig = {
  // 关键：启用静态导出模式（Next 13+ 用法）
  output: "export",

  // 让 GitHub Pages 正常识别目录下的 index.html
  trailingSlash: true,

  // 部署到项目页时需要前缀
  basePath,
  assetPrefix,

  // 如果用了 next/image，静态导出需要关闭优化器
  images: {
    unoptimized: true,
  },

  webpack(config) {

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;

