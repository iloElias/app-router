"use client";
import { cn } from "@heroui/react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { useEffect, useState } from "react";

export type HrefProps = {
  pathname: string;
  query?: Record<string, string | number>;
};

export interface LinkProps extends NextLinkProps {
  href: string | HrefProps;
  target?: "_blank" | "_self" | "_parent" | "_top";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children?: React.ReactNode;
  className?: string;
}

export const formatLink = (href: HrefProps) => {
  const { pathname, query } = href;
  const queryString = new URLSearchParams(
    Object.entries(query || {}).reduce((acc, [key, value]) => {
      if (value && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();
  return `${pathname}${queryString ? `?${queryString}` : ""}`;
};

export const Link: React.FC<LinkProps> = ({
  href,
  target,
  onClick,
  children,
  className,
}: LinkProps) => {
  const [formattedHref, setFormattedHref] = useState<string>("");

  useEffect(() => {
    if (typeof href === "string") {
      setFormattedHref(href);
    } else {
      setFormattedHref(formatLink(href));
    }
  }, [href]);

  return (
    <NextLink
      href={formattedHref}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
          e.currentTarget.click();
        }
        if (e.defaultPrevented) return;
        if (href === "#" || target) {
          e.preventDefault();
        }
        if (target) {
          window.open(formattedHref, target);
        }
      }}
      className={cn(
        "hover:opacity-80 focus:outline-focus hover:underline transition-all",
        className
      )}
    >
      {children}
    </NextLink>
  );
};
