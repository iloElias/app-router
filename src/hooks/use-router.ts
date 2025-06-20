"use client";
import { useRouter as useNextRouter } from "next/navigation";

export const useRouter = () => {
  const router = useNextRouter();
  const query =
    typeof window !== "undefined"
      ? Object.fromEntries(new URLSearchParams(window.location.search))
      : {};

  const push = (
    href:
      | string
      | {
          pathname: string;
          query?: Record<string, string | number | (string | number)[]>;
        }
  ) => {
    if (typeof href === "string") {
      router.push(href);
    } else {
      const queryString = new URLSearchParams(
        Object.entries(href.query || {}).reduce((acc, [key, value]) => {
          if (Array.isArray(value)) {
            acc[key] = value.map((v) => String(v)).join(",");
          } else if (value !== undefined && value !== null) {
            acc[key] = String(value);
          }
          return acc;
        }, {} as Record<string, string>)
      );
      router.push(`${href.pathname}/?${queryString}`);
    }
  };

  return {
    query,
    ...router,
    push,
  };
};
