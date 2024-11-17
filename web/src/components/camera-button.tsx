// components/CameraButton.js

"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button"; // Adjust the import based on your button component location

export function CameraButton() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [hasCameraPermission, setCameraPermission] = useState(false);

  // Function to check camera permissions
  const checkCameraPermission = async () => {
    try {
      const permission = await navigator.permissions.query({
        name: "camera",
      });
      if (permission.state === "granted") {
        setCameraPermission(true);
      } else if (permission.state === "prompt") {
        // Request permission
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setCameraPermission(true);
        // Stop all tracks to release the camera
        stream.getTracks().forEach((track) => track.stop());
      } else {
        setCameraPermission(false);
      }
    } catch (error) {
      console.error("Error checking camera permissions:", error);
    }
  };

  // Function to toggle the camera
  const toggleCamera = useCallback(() => {
    setIsCameraOn((prev) => !prev);
  }, []);

  useEffect(() => {
    checkCameraPermission();
  }, []);

  return (
    <Button disabled={!hasCameraPermission} onClick={toggleCamera}>
      Camera: {isCameraOn ? "On" : "Off"}
    </Button>
  );
}
