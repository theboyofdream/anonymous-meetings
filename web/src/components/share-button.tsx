"use client";

import { useCallback } from "react";
import { Button } from "./ui/button";

export function ShareButton() {
  const shareMeetingLink = useCallback(() => {
    navigator
      .share({
        title: "Meeting Link",
        url: window.location.href,
      })
      // .then(() => console.log("Sharing was successful"))
      .catch((error) => alert(`Sharing failed: ${error}`));
  }, []);
  return (
    <>
      {navigator.share && (
        <Button onClick={shareMeetingLink}>share meeting link</Button>
      )}
    </>
  );
}
