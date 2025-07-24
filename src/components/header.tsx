import { useApp } from "@/contexts/app-context";
import { useAuth } from "@/contexts/auth-provider";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Avatar,
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { useId } from "react";
import { Suspense } from "./suspense";

export interface HeaderProps {
  shouldHideOnScroll?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  shouldHideOnScroll = true,
}) => {
  const id = useId();
  const { user } = useAuth();

  const { setHeaderVisible } = useApp();

  const [debounce] = useDebounce(() => {
    setHeaderVisible(
      document?.getElementById(id)?.getAttribute("data-hidden") !== "true"
    );
  }, 1);

  return (
    <Navbar
      id={id}
      isBordered
      shouldHideOnScroll={shouldHideOnScroll}
      onScrollPositionChange={debounce}
    >
      <NavbarContent>
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <Suspense condition={!user}>
          <NavbarItem>
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </Suspense>
        <Suspense condition={!!user}>
          <NavbarItem className="flex items-center">
            <Button isIconOnly as={Link} href="/login">
              <Avatar
                src={user?.picture}
                radius="none"
                suppressHydrationWarning
              />
            </Button>
          </NavbarItem>
        </Suspense>
      </NavbarContent>
    </Navbar>
  );
};
