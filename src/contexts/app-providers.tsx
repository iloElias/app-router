import { ClientSideProviders } from "./client-side-providers";
import { ServerSideProviders } from "./server-side-providers";

export interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <>
      <ServerSideProviders>
        <ClientSideProviders>{children}</ClientSideProviders>
      </ServerSideProviders>
    </>
  );
};
