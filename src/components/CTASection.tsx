export default function CTASection() {
  return (
    <div id="contact" className="bg-stone-ink rounded-[16px] md:rounded-[20px] px-6 md:px-12 xl:px-16 py-12 md:py-16 xl:py-20 flex flex-col items-center gap-5 md:gap-6 text-center">
      {/* Heading */}
      <div className="flex flex-col leading-[1.15]">
        <p className="font-cormorant font-medium text-[28px] md:text-[34px] xl:text-[40px] text-[#faf8f5] tracking-[-0.8px]">
          Let's design products that scale
        </p>
        <p className="font-cormorant italic text-[28px] md:text-[34px] xl:text-[40px] text-stone-muted tracking-[-0.8px]">
          and make an impact
        </p>
      </div>

      {/* Subtitle */}
      <p className="font-instrument text-white/45 text-[13px] md:text-[14px] leading-[1.6] max-w-[400px] md:max-w-[480px]">
        Open to full-time product design roles at companies building things that matter.
      </p>

      {/* Email */}
      <a
        href="mailto:Vimalabanavath.design@gmail.com"
        className="font-cormorant text-[15px] md:text-[18px] xl:text-[22px] text-[#faf8f5] border-b border-white/20 pb-0.5 hover:border-white/50 transition-colors mt-2 break-all md:break-normal"
      >
        Vimalabanavath.design@gmail.com
      </a>

      {/* Social links */}
      <div className="flex items-center gap-5 md:gap-8 mt-2">
        <a href="#" className="font-instrument text-[11px] text-white/35 tracking-[1px] uppercase hover:text-white/60 transition-colors">
          LinkedIn ↗
        </a>
        <a href="#" className="font-instrument text-[11px] text-white/35 tracking-[1px] uppercase hover:text-white/60 transition-colors">
          Dribbble ↗
        </a>
        <a href="#" className="font-instrument text-[11px] text-white/35 tracking-[1px] uppercase hover:text-white/60 transition-colors">
          Resume ↗
        </a>
      </div>
    </div>
  )
}
