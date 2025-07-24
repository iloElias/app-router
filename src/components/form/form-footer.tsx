import { cn } from "@heroui/react";

export interface FormFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const FormFooter: React.FC<FormFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex justify-end gap-4 col-span-full", className)}>
      {children}
    </div>
  );
};
