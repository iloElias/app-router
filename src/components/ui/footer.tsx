"use client";
import React from "react";
import { domAnimation, LazyMotion, motion } from "framer-motion";
import { useApp } from "@/contexts/app-context";
import { cn } from "@heroui/react";

export interface FooterProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  children,
  className,
  ...props
}) => {
  const { headerVisible } = useApp();

  if (!children) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.nav
        animate={!headerVisible ? "hidden" : "visible"}
        initial={false}
        variants={{
          visible: {
            y: 0,
            transition: {
              ease: "ease-out",
            },
          },
          hidden: {
            y: "100%",
            transition: {
              ease: "ease-in",
            },
          },
        }}
        className={cn(
          "bottom-0 left-0 z-40 fixed flex justify-center items-center bg-background/70 shadow-sm backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 border-divider border-t data-[menu-open=true]:border-none w-full h-auto transition-colors",
          className
        )}
        {...props}
      >
        <footer className="z-40 relative flex flex-row flex-nowrap justify-between items-center gap-4 px-10 w-full max-w-[1024px] h-[var(--navbar-height)]">
          {children}
        </footer>
      </motion.nav>
    </LazyMotion>
  );
};
