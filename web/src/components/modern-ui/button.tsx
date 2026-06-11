import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from '@/lib/utils';
import { LoaderCircleIcon } from "@/components/icons/loader-circle";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium select-none transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-primary bg-primary text-primary-foreground shadow-sm hover:brightness-110 active:brightness-95",
        destructive:
          "border border-destructive bg-destructive-subtle text-destructive-subtle-foreground shadow-sm hover:brightness-110 active:brightness-95",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted hover:border-border",
        secondary:
          "border border-border bg-secondary text-secondary-foreground shadow-sm hover:brightness-110 active:brightness-95",
        ghost:
          "text-muted-foreground hover:bg-muted hover:text-foreground active:bg-accent",
        link: "text-primary underline-offset-4 hover:underline active:scale-100",
        icon: "[&_svg]:size-4",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      icon,
      loading = false,
      ...props
    },
    ref
  ) => {
    return (
      <>
        {asChild ? (
          <Slot
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          >
            {props.children}
          </Slot>
        ) : (
          <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            disabled={loading || props.disabled}
            {...props}
          >
            {loading ? <LoaderCircleIcon size={16} className="animate-spin" /> : icon}
            {props.children}
          </button>
        )}
      </>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
