import { SectionHeader } from '@/components/SectionHeader';
import { Card } from '@/components/Card';
import { CardHeader } from '@/components/CardHeader';
import StarIcon from '@/assets/icons/star.svg';
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import JavascriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ChromeIcon from "@/assets/icons/chrome.svg";
import GithubIcon from "@/assets/icons/github.svg";
import { ToolboxItems } from "@/components/ToolboxItems";
import mapImage from "@/assets/images/la-map.png";
import smileMemoji from "@/assets/images/coder-desk.png";

const toolboxItems = [
  {
    title: 'JavaScript',
    iconType: JavascriptIcon,
  },
  {
    title: 'HTML5',
    iconType: HTMLIcon,
  },
  {
    title: 'CSS3',
    iconType: CssIcon,
  },
  {
    title: 'React',
    iconType: ReactIcon,
  },
  {
    title: 'Chrome',
    iconType: ChromeIcon,
  },
  {
    title: 'GitHub',
    iconType: GithubIcon,
  }
]

const hobbies = [
  {
    title: 'Swimming',
    emoji: '🏊🏻‍♂️',
    left: '0%',
    top: '0%',
  },
  {
    title: 'Archery',
    emoji: '🏹',
    left: '55%',
    top: '5%',
  },
  {
    title: 'Gaming',
    emoji: '🎮',
    left: '5%',
    top: '20%',
  },
  {
    title: 'Hiking',
    emoji: '🥾',
    left: '50%',
    top: '25%',
  },
  {
    title: 'Photography',
    emoji: '📸',
    left: '12%',
    top: '46%',
  },
  {
    title: 'Cooking',
    emoji: '🥘',
    left: '8%',
    top: '66%',
  },
  {
    title: 'Reading',
    emoji: '📚',
    left: '52%',
    top: '72%',
  }
]

export const AboutSection = () => {
  return (
    <div className="pb-16">
      <div className="container">
      <SectionHeader 
        eyebrow="About Me"
        title="A Glimpse Into My World"
        description="Learn more about who I am, what I do, and what inspires me." />
      <div className="mt-12 flex flex-col gap-4">
      <Card className="h-[320px]">
        <CardHeader 
          title="My Reads" 
          description="Explore the books shaping my thinking." 
          className="px-4 pt-4"
        />
        <div className="w-40 mx-auto">
          <Image src={bookImage} alt="Book cover" />
        </div>
      </Card>
      <Card className="h-[320px] p-0">
        <CardHeader 
          title="My Toolbox" 
          description="Explore the technologies and tools I use to craft exceptional digital experiences." 
          className="px-4 pt-4"
        />
        <ToolboxItems 
          items={toolboxItems}
          className="mt-6" />
        <ToolboxItems 
          items={toolboxItems} 
          className="mt-6"
          itemsWrapperClassName="-translate-x-1/2"
        />
      </Card>  
      
      <Card className="h-[320px] p-0 flex flex-col">
        <CardHeader 
          title="Beyond the Code" 
          description='Explore my interests and hobbies beyond the digital realm.'
          className="px-6 py-6"
        />
        <div className="relative flex-1"> 
          {  
            hobbies.map(hobby => (
              <div key={hobby.title} 
                className="inline-flex items-center gap-2 px-6 
                  bg-gradient-to-r from-sky-300 to-sky-500
                  rounded-full py-1.5 absolute"
                style={{
                  left: hobby.left,
                  top: hobby.top,
                }}>
                <span className="font-medium text-gray-950">{hobby.title}</span>
                <span>{hobby.emoji}</span>
              </div> 
            ))
          }
        </div>
      </Card>

      <Card className="h-[320px] p-0 relative">
        <Image src={mapImage} alt="map"
          className="h-full w-full object-cover" />
        <div 
          className="absolute top-1/2 left-3/4
          -translate-x-1/2 -translate-y-1/2 size-16 rounded-full">
          <Image src={smileMemoji} alt="smile memoji" className="size-10" />
        </div>
        
      </Card>
    
      </div>
      </div>
    </div>
  );
};
