interface CaseStudyCardProps {
  title: string
  date: string
  description: string
  image: string
  imageAlt: string
}

export default function CaseStudyCard({ title, date, description, image, imageAlt }: CaseStudyCardProps) {
  return (
    <div className="flex flex-col gap-5 md:gap-6 w-full cursor-pointer">
      {/* Header: two columns on md+, stacked on mobile */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8">
        {/* Left: title + date */}
        <div className="flex flex-col gap-2 md:gap-3 md:max-w-[46%]">
          <h3 className="font-fraunces text-[18px] md:text-[20px] xl:text-[22px] text-[#1c1917] leading-[1.3] tracking-[-0.3px]">
            {title}
          </h3>
          <span className="font-instrument text-[11px] text-rust tracking-[0.5px] uppercase">
            {date}
          </span>
        </div>
        {/* Right: description */}
        <p className="font-work text-[13.5px] md:text-[14.5px] text-[#555] leading-[1.65] tracking-[-0.3px] md:max-w-[46%]">
          {description}
        </p>
      </div>

      {/* Full-width image — 24px internal padding, no edge bleed, object-contain */}
      <div
        className="w-full bg-[#f5f4f2] overflow-hidden p-6"
        style={{ aspectRatio: '1229 / 550' }}
      >
        <img src={image} alt={imageAlt} className="w-full h-full object-contain transition-transform duration-[220ms] ease-out hover:scale-[1.02]" />
      </div>
    </div>
  )
}
