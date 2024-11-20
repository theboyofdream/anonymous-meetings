"use client";

import { useMic } from "@/stores/useMic";
import { useEffect } from "react";
import { Button } from "./ui/button";

export function MicButton() {
  const { micOn, hasMicPermission, toggleMic, checkMicPermission } = useMic();

  useEffect(() => {
    checkMicPermission();
  }, [checkMicPermission, hasMicPermission]);

  return (
    <Button disabled={!hasMicPermission} onClick={toggleMic}>
      mic: {micOn ? "on" : "off"}
    </Button>
  );
}
