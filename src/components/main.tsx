import { cn } from "@heroui/react";

export interface MainProps {
  children?: React.ReactNode;
  className?: string;
}

export const Main: React.FC<MainProps> = ({ children, className }) => {
  return (
    <main
      className={cn("flex-grow mx-auto px-6 max-w-7xl container", className)}
    >
      {children}
    </main>
  );
};
