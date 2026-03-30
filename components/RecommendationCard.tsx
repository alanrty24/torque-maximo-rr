import Image from 'next/image';
import React, { FC } from 'react';

type Props = {
  name: string;
  company: string;
  quote: string;
  avatar: string;
};

const RecommendationCard: FC<Props> = ({ name, company, quote, avatar }) => {
  return (
    <article className="rounded-2xl w-full h-full bg-[#0b0b0b] shadow-[0_0px_12px_orange] p-4 text-center flex flex-col items-center gap-4">
      <div className="h-20 w-20 rounded-full overflow-hidden ring-2 ring-primary/30">
        <Image 
        src={avatar} 
        alt={`${name} avatar`} 
        width={200}
        height={200}
        className="w-full h-full object-cover" />
      </div>
      <blockquote className="text-silver italic text-base max-w-lg">“{quote}”</blockquote>
      <footer className="mt-2 text-white font-bold">{name}</footer>
      <span className="text-primary text-sm">{company}</span>
    </article>
  );
};

export default RecommendationCard;
