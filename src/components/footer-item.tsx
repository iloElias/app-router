"use client";
import { Button, cn, Link } from "@heroui/react";

interface FooterItemChildrenProps {
  active?: boolean;
  className?: string;
}

interface FooterItemProps {
  label: string;
  href?: string;
  className?: string;
  children?:
    | React.ReactNode
    | ((params: FooterItemChildrenProps) => React.ReactNode);
  disabled?: boolean;
}

const FooterItem: React.FC<FooterItemProps> = ({
  label,
  href,
  className,
  children,
  disabled,
}) => {
  const isActive =
    href && typeof window !== "undefined"
      ? window.location.pathname === href
      : false;

  return (
    <Button
      as={Link}
      href={href}
      isIconOnly
      className={cn(
        className,
        "flex flex-col items-center text-sm aspect-square size-14 gap-0.5 text-default-900 bg-transparent my-1"
      )}
      isDisabled={disabled}
    >
      {typeof children === "function"
        ? children({ active: isActive, className: className || "" })
        : children}
      {label}
    </Button>
  );
};

export default FooterItem;
