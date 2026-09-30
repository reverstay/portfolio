import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const variants = {
  primary: "bg-accent text-ink hover:bg-accent/90",
  secondary: "border border-border text-text hover:border-accent/50 hover:text-accent",
};

type Common = { variant?: keyof typeof variants; className?: string };
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button({ variant = "primary", className = "", children, ...props }: AsLink | AsButton) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${variants[variant]} ${className}`;

  if (props.href) {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
