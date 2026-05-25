import React from 'react';
interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}
export function SectionHeading({
  title,
  subtitle,
  centered = false
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
        {title}
      </h2>
      {subtitle &&
      <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed mx-auto">
          {subtitle}
        </p>
      }
    </div>);

}