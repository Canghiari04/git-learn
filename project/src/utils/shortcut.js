import { useEffect } from "react";

export function BackShortCut(handleClick) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.shiftKey && event.ctrlKey) {
        handleClick();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    }
  });
}

export function ForwardShortCut(handleClick) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.shiftKey && event.code === "Enter") {
        handleClick();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    }
  });
}