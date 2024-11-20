"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ShareButton() {
  const [canShare, setCanShare] = useState(false);
  const shareMeetingLink = useCallback(() => {
    navigator
      .share({
        title: "Meeting Link",
        url: window.location.href,
      })
      // .then(() => console.log("Sharing was successful"))
      .catch((error) => alert(`Sharing failed: ${error}`));
  }, []);

  useEffect(() => {
    (async () => {
      if (await navigator.share) {
        setCanShare(true);
      }
    })();
  }, [setCanShare]);

  return (
    <>
      {canShare && (
        <Button onClick={shareMeetingLink}>share meeting link</Button>
      )}
    </>
  );
}
