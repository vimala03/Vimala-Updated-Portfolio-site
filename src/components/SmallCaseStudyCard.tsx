interface SmallCaseStudyCardProps {
  title: string
  category: string
  description: string
  image: string
  imageAlt: string
}

export default function SmallCaseStudyCard({ title, category, description, image, imageAlt }: SmallCaseStudyCardProps) {
  return (
    // h-full + flex-col lets the grid row dictate height so images align across columns
    <div className="h-full flex flex-col gap-5 cursor-pointer">
      {/* Text block grows to fill available space, pushing image to a consistent position */}
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex flex-col gap-1.5">
          <h4 className="font-fraunces text-[20px] text-[#1c1917] leading-[1.3] tracking-[-0.25px]">
            {title}
          </h4>
          <span className="font-instrument text-[11px] text-rust tracking-[0.5px] uppercase">
            {category}
          </span>
        </div>
        <p className="font-work text-[14px] text-[#555] leading-[1.65] tracking-[-0.3px]">
          {description}
        </p>
      </div>

      {/* Image — 24px internal padding, no edge bleed, object-contain */}
      <div
        className="w-full bg-[#f5f4f2] overflow-hidden p-4 md:p-6 shrink-0"
        style={{ aspectRatio: '498 / 246' }}
      >
        <img src={image} alt={imageAlt} className="w-full h-full object-contain transition-transform duration-[220ms] ease-out hover:scale-[1.02]" />
      </div>
    </div>
  )
}
