interface StatItemProps {
  value: string
  label: string
  showSeparator?: boolean
}

export default function StatItem({ value, label, showSeparator = true }: StatItemProps) {
  return (
    // Horizontal row: stat content + optional separator
    <div className="flex flex-row items-end">
      {/* Vertical stat block — strict flex-col, gap-[18px] only, no margins */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <span className="font-opensans text-[28px] text-stone-ink leading-none tracking-[-0.56px]">
          {value}
        </span>
        <span className="font-opensans text-[16px] text-deep-green leading-none tracking-[-0.32px]">
          {label}
        </span>
      </div>

      {/* Separator */}
      {showSeparator && (
        <div className="hidden xl:block w-[2px] h-[62px] bg-deep-green opacity-15 rounded-[4px] shrink-0 mx-[28px]" />
      )}
    </div>
  )
}
