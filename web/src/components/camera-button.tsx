"use client";

import { useCamera } from "@/stores/useCamera";
import { useEffect } from "react";
import { Button } from "./ui/button"; // Adjust the import based on your button component location

export function CameraButton() {
  const { cameraOn, hasCameraPermission, checkCameraPermission, toggleCamera } =
    useCamera();

  useEffect(() => {
    checkCameraPermission();
  }, [checkCameraPermission]);

  return (
    <Button disabled={!hasCameraPermission} onClick={toggleCamera}>
      camera: {cameraOn ? "On" : "Off"}
    </Button>
  );
}
