import { TechIcon } from "./TechIcon";
import { twMerge } from "tailwind-merge";

export const ToolboxItems = (
    { 
        items,
        className,
        itemsWrapperClassName,
    }:{
        items: {
            title: string;
            iconType: React.ElementType;
        }[];
        className?: string;
        itemsWrapperClassName?: string;
    }
) => {
    return (
        <div className={twMerge(
            "flex ", 
            className)}>
            <div className={twMerge(
                    "flex flex-none py-0.5 gap-6 pr-6", 
                    itemsWrapperClassName)}>
                {
                    items.map(item => (
                        <div key={item.title} className="inline-flex items-center 
                        gap-4 py-2 px-3
                        outline outline-2 outline-white/20 rounded-lg">
                            <TechIcon component={item.iconType} />
                            <span className="font-semibold">{item.title}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}