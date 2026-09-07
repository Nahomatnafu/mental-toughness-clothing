import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "paper";
type Size = "md" | "sm";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = BaseProps & { href: string; external?: boolean };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function classes({ variant = "primary", size = "md", block, className = "" }: BaseProps) {
  return ["btn", `btn-${variant}`, size === "sm" ? "btn-sm" : "", block ? "btn-block" : "", className].join(" ").trim();
}

/** The chamfered button. Renders a Link when `href` is given. */
export function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const { href, external, children, ...rest } = props;
    if (external) {
      return (
        <a href={href} className={classes(rest as BaseProps)} rel="noopener">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes(rest as BaseProps)}>
        {children}
      </Link>
    );
  }
  const { variant, size, block, className, children, type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={classes({ variant, size, block, className, children })} {...rest}>
      {children}
    </button>
  );
}
