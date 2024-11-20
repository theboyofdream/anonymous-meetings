"use client";

import { useCamera } from "@/stores/useCamera";
import { useMic } from "@/stores/useMic";
import { useCallback, useEffect, useRef } from "react";

type CameraProps = {
  className: string | undefined;
};

export function Camera(props: CameraProps) {
  const { micOn } = useMic();
  const { cameraOn } = useCamera();

  const cameraRef = useRef<HTMLVideoElement>(null);

  const startCamera = useCallback(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: micOn })
      .then((stream) => {
        if (cameraRef.current) {
          cameraRef.current.width = window.screen.availWidth;
          cameraRef.current.height = window.screen.availHeight;
          cameraRef.current.srcObject = stream;
          cameraRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Error at start camera:", err);
      });
  }, [micOn]);

  const stopCamera = useCallback(() => {
    if (cameraRef.current && cameraRef.current.srcObject) {
      const tracks = cameraRef.current.srcObject.getTracks();
      tracks.forEach((track) => {
        track.stop(); // Stop the track
        track.enabled = false; // Disable the track
      });

      // Reset video element to prevent blinking
      cameraRef.current.pause();
      cameraRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    (cameraOn ? startCamera : stopCamera)();
    return stopCamera;
  }, [cameraOn, startCamera, stopCamera]);

  return (
    <video
      className={props.className}
      ref={cameraRef}
      id="camera"
      controls={false}
    />
  );
}
