"use client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "./app-context";
import { AuthProvider } from "./auth-provider";

export interface ClientSideProvidersProps {
  children: React.ReactNode;
}

export const ClientSideProviders: React.FC<ClientSideProvidersProps> = ({
  children,
}) => {
  return (
    <>
      <HeroUIProvider locale="pt-BR" className="relative h-full">
        <ThemeProvider>
          <AppProvider>
            <AuthProvider>{children}</AuthProvider>
          </AppProvider>
        </ThemeProvider>
      </HeroUIProvider>
    </>
  );
};
