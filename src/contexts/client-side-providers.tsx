"use client";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AppProvider } from "./app-context";

export interface ClientSideProvidersProps {
  children: React.ReactNode;
}

export const ClientSideProviders: React.FC<ClientSideProvidersProps> = ({
  children,
}) => {
  return (
    <>
      <HeroUIProvider>
        <NextThemesProvider>
          <AppProvider>{children}</AppProvider>
        </NextThemesProvider>
      </HeroUIProvider>
    </>
  );
};
