import {useEffect} from "react";

export const useKeySubmit = (submit: () => void) => {
  return useEffect(() => {
    const keyDownEvent = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submit();
      }
    };
    document.addEventListener('keydown', keyDownEvent);
    return () => {
      document.removeEventListener('keydown', keyDownEvent);
    };
  });
}