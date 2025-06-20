import { cn } from "@heroui/react";


export interface FormBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const FormBody: React.FC<FormBodyProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 w-full min-h-max form-body",
        className
      )}
    >
      {children}
    </div>
  );
};
