import { useState, useEffect, useCallback } from "react";
import { NextRouter, useRouter } from "next/router";

export interface UseFieldOptions<T> {
  initialValue?: T;
  onChange?: (newValue: T) => void;
  queryCollectable?: T extends string | number ? boolean : false;
  queryCollectFunction?: ({
    name,
    router,
  }: {
    name: string;
    router: NextRouter;
  }) => T | void;
}

export interface UseFieldResult<T> {
  name: string | undefined;
  value: T;
  onChange: (newValue: T) => void;
  hasFirstRender: boolean;
}

export function useField<T = string>(
  inputName: string | undefined,
  options: UseFieldOptions<T> = {}
): UseFieldResult<T> {
  const router = useRouter();
  const name = inputName;

  const [value, setValue] = useState<T>(
    options.initialValue ?? ("" as unknown as T)
  );
  const [hasFirstRender, setHasFirstRender] = useState(false);

  useEffect(() => {
    if (!router.isReady || !name || hasFirstRender) return;

    if (options.queryCollectable) {
      if (options.queryCollectFunction) {
        const res = options.queryCollectFunction({ name, router });
        if (res !== undefined) {
          setValue(res);
        }
      } else {
        const queryValue = router.query[name];
        if (queryValue !== undefined) {
          setValue(queryValue as T);
        }
      }
    }
    setHasFirstRender(true);
  }, [router.isReady, options, name, hasFirstRender, router]);

  const onChange = useCallback((newValue: T) => {
    setValue(newValue);
    options.onChange?.(newValue);
  }, [options]);

  return {
    name,
    value,
    onChange,
    hasFirstRender,
  };
}
