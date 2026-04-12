import { Link } from 'react-router-dom'

const imgFeatured = 'https://www.figma.com/api/mcp/asset/644e80ca-196a-4ba4-95ea-d20c2302b5f3'

export default function HeroCard() {
  return (
    <div className="bg-lavender rounded-[13px] p-5 md:p-[22px] xl:p-[26px] flex flex-col gap-5 md:gap-[22px] xl:gap-[26px] w-full md:w-[340px] lg:w-[420px] xl:w-[511px] shrink-0">
      {/* Card text */}
      <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
        <h3 className="font-fraunces text-[16px] md:text-[17px] xl:text-[19.4px] text-[#1c1917] leading-normal tracking-[-0.32px] max-w-[280px] md:max-w-[300px] xl:max-w-[340px]">
          AI-Powered Search & Decision Optimization
        </h3>
        <p className="font-opensans text-[8.5px] md:text-[10px] xl:text-[12px] text-[#1c1917] leading-[1.5] max-w-[240px] md:max-w-[270px] xl:max-w-[310px]">
          AI-driven search and contextual actions that transform complex navigation into faster, decision-based workflows.
        </p>
        <p className="font-instrument text-[7.5px] md:text-[9px] xl:text-[10px] text-black/55 tracking-[1px] uppercase leading-[20.5px] max-w-[240px] md:max-w-[270px] xl:max-w-[310px]">
          Reduced 90% manual effort across enterprise workflows.
        </p>
      </div>

      {/* Case study image */}
      <div className="w-full aspect-[1170/754]">
        <img
          src={imgFeatured}
          alt="AI-Powered Search case study preview"
          className="w-full h-full object-contain"
        />
      </div>

      {/* CTA */}
      <div className="flex items-center justify-center">
        <Link to="/work/cornerstone" className="border border-stone-ink/30 rounded-full px-4 md:px-5 py-[9px] md:py-[11px] flex items-center gap-2 hover:border-stone-ink/60 hover:bg-stone-ink/5 transition-[border-color,background-color] duration-200" style={{ textDecoration: 'none' }}>
          <span className="font-instrument font-bold text-stone-mid text-[11px] md:text-[12.2px] tracking-[0.73px] uppercase whitespace-nowrap">
            View Case study →
          </span>
        </Link>
      </div>
    </div>
  )
}
