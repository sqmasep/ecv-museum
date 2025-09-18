import { useCallback, useState } from "react";

export function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(
    (force?: boolean) => setValue(prev => force ?? !prev),
    [setValue]
  );

  return [value, toggle] as const;
}
