import { useCallback, useState } from 'react';

type UseBooleanReturnType = [boolean, () => void, () => void, () => void];

/**
 * Boolean value status hosting, which can be used for pop-up box display, check box, etc.
 * @param initial initial boolean value
 * @returns {UseBooleanReturnType} return [boolean state, true set function, false set function, toggle function]
 */
export default function useBoolean(initial: boolean): UseBooleanReturnType {
  const [state, setState] = useState<boolean>(initial);
  const toggler = useCallback(() => {
    setState(!state);
  }, [state]);

  const trueSetter = useCallback(() => {
    setState(true);
  }, []);
  const falseSetter = useCallback(() => {
    setState(false);
  }, []);
  return [state, trueSetter, falseSetter, toggler];
}
