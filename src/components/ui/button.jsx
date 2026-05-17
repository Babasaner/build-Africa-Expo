import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-[10px] whitespace-nowrap rounded-[100px] text-[16px] leading-[20px] font-['Inter'] font-bold uppercase transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-[#D2D2D1] disabled:text-[#9A9A9A] disabled:border-transparent [&_svg]:pointer-events-none [&_svg]:w-[20px] [&_svg]:h-[20px] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#36499B] text-white hover:bg-[#28377A] focus-visible:bg-[#4558AA] focus-visible:ring-[#36499B] active:bg-[#1A265A]",
        secondary:
          "bg-[#00AB92] text-white hover:bg-[#008A75] focus-visible:bg-[#1ACBB2] focus-visible:ring-[#00AB92] active:bg-[#005B4D]",
        outline:
          "border-[2px] border-[#36499B] bg-transparent text-[#36499B] hover:bg-[#EEF2FF] focus-visible:bg-transparent focus-visible:ring-[#36499B] active:bg-[#DCE4FF] disabled:bg-transparent disabled:border-[#D2D2D1] disabled:text-[#9A9A9A]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-[48px] px-[28px] py-[14px]",
        sm: "h-[40px] px-[20px] text-[14px]",
        lg: "h-[56px] px-[36px] text-[18px]",
        icon: "h-[48px] w-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
