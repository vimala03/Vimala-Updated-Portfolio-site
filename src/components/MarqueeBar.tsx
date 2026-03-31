const skills = [
  'UX Research',
  'Product Design',
  'Design Systems',
  'AI Workflows',
  'Enterprise UX',
  'Product systems',
  'Applied Psychology',
  'Interaction Design',
  'Dovetail',
  'Framer',
  'Storybook',
  'Information Architecture',
  'Figma',
]

export default function MarqueeBar() {
  // Duplicate for seamless loop
  const items = [...skills, ...skills]

  return (
    <div className="bg-lavender border-t border-b border-stone-ink/9 overflow-hidden py-[17px]">
      <div className="flex animate-marquee whitespace-nowrap w-max">
        {items.map((skill, i) => (
          <div
            key={i}
            className="flex items-center border-r border-stone-ink/9 px-[50px]"
          >
            <span className="font-instrument text-stone-muted text-[13.7px] tracking-[1.37px] uppercase">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
