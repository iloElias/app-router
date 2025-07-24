import { useApp } from "@/contexts/app-context";

export interface SuspenseProps {
  children: React.ReactNode;
  condition?: boolean;
}

export const Suspense: React.FC<SuspenseProps> = ({
  children,
  condition = true,
}) => {
  const { mounted } = useApp();

  if (!mounted || !condition) {
    return;
  }

  return <>{children}</>;
};
