"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";

export function MicButton() {
  const [isMicOn, setIsMicOn] = useState(false);
  const [hasMicPermission, setMicPermission] = useState(false);

  // Function to check microphone permissions
  const checkMicPermission = async () => {
    try {
      const permission = await navigator.permissions.query({
        name: "microphone",
      });
      if (permission.state === "granted") {
        setMicPermission(true);
      } else if (permission.state === "prompt") {
        // Request permission
        const result = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setMicPermission(true);
        // Stop all tracks to release the microphone
        result.getTracks().forEach((track) => track.stop());
      } else {
        setMicPermission(false);
      }
    } catch (error) {
      console.error("Error checking microphone permissions:", error);
    }
  };

  // Function to toggle the microphone
  const toggleMicrophone = useCallback(() => setIsMicOn((prev) => !prev), []);

  useEffect(() => {
    checkMicPermission();
  }, []);

  return (
    <Button disabled={!hasMicPermission} onClick={toggleMicrophone}>
      mic: {isMicOn ? "on" : "off"}
    </Button>
  );
}
