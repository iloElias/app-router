import { Footer } from "./footer";
import { Header } from "./header";

export interface LayoutProps {
  children?: React.ReactNode;
  hideHeader?: boolean;
  headerShouldHideOnScroll?: boolean;
  hideFooter?: boolean;
  footerShouldHideOnScroll?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  hideHeader = false,
  headerShouldHideOnScroll,
  hideFooter = false,
  footerShouldHideOnScroll,
}) => {
  return (
    <>
      {!hideHeader && <Header shouldHideOnScroll={headerShouldHideOnScroll} />}
      {children}
      {!hideFooter && <Footer shouldHideOnScroll={footerShouldHideOnScroll} />}
    </>
  );
};
