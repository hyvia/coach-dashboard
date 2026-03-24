import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[8px] border border-transparent bg-clip-padding text-base font-semibold whitespace-nowrap cursor-pointer transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-surface-lighter disabled:text-muted disabled:border-transparent aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-pressed",
        outline:
          "border-2 border-primary bg-transparent text-primary hover:bg-primary-10 active:bg-primary-20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "border border-border bg-surface text-foreground font-medium hover:bg-surface-light",
        destructive:
          "border border-error/30 bg-transparent text-error font-medium hover:bg-error-10 focus-visible:border-error/40 focus-visible:ring-error/20",
        link: "border-transparent bg-transparent text-primary font-medium text-sm hover:opacity-80",
      },
      size: {
        default: "h-12 gap-2 px-6",
        sm: "h-9 gap-1.5 px-4 text-sm",
        xs: "h-7 gap-1 px-3 text-xs rounded-[6px]",
        lg: "h-14 gap-2 px-8 text-lg",
        icon: "size-11 rounded-full",
        "icon-sm": "size-9 rounded-full",
        "icon-xs": "size-7 rounded-full",
        "icon-lg": "size-14 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
