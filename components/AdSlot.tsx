const variants = {
  banner:    { w: 728,  h: 90,  label: '728×90 Banner',    cls: 'hidden md:block' },
  rectangle: { w: 300,  h: 250, label: '300×250 Rectangle', cls: 'block' },
  sidebar:   { w: 160,  h: 600, label: '160×600 Sidebar',   cls: 'hidden lg:block sticky top-4' },
}

interface AdSlotProps {
  variant: keyof typeof variants
  slotId?: string
}

export default function AdSlot({ variant, slotId }: AdSlotProps) {
  const { w, h, label, cls } = variants[variant]
  const hasPub = Boolean(process.env.NEXT_PUBLIC_ADSENSE_PUB_ID)

  return (
    <div data-noprint className={cls} style={{ minWidth: w, minHeight: h }}>
      {/* ADSENSE SLOT: Replace with AdSense unit */}
      {!hasPub ? (
        <div
          className="bg-gray-100 border border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-xs"
          style={{ width: w, height: h }}
          data-ad-slot={slotId ?? 'REPLACE_SLOT_ID'}
          data-ad-format={variant}
        >
          Advertisement — {label}
        </div>
      ) : (
        <ins
          className="adsbygoogle"
          style={{ display: 'inline-block', width: w, height: h }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUB_ID}
          data-ad-slot={slotId ?? 'REPLACE_SLOT_ID'}
          data-ad-format={variant}
        />
      )}
    </div>
  )
}
