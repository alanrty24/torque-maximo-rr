import { FC } from 'react';
import Reveal from '@/components/Reveal';

type ServiceCardProps = {
  title: string;
  description: string;
  efecto: string;
  Icon: FC<{ className?: string }>;
};

export default function ServiceCard({ title, description, efecto, Icon }: ServiceCardProps) {
  return (
    <Reveal>
      <article className={`group w-full h-full bg-[#101010]/80 rounded-2xl p-6 border border-slate-700 hover:border-primary transition-colors`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`${efecto} h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary`}>
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-white">{title}</h3>
        </div>
        <p className="text-sm text-silver">{description}</p>
      </article>
    </Reveal>
  );
}
