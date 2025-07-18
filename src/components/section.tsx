import { cn } from "@heroui/react";

export interface SectionProps {
  children?: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className }) => {
  return (
    <section
      className={cn(
        "flex flex-col justify-center items-center gap-4 pb-12",
        className
      )}
    >
      {children}
    </section>
  );
};
