"use client";

import { CameraButton } from "@/components/camera-button";
import { MicButton } from "@/components/mic-button";
import { ShareButton } from "@/components/share-button";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function Meeting() {
  //   const { cameraOn, checkCameraPermission, hasCameraPermission, toggleCamera } =
  //     useCamera();

  //   useEffect(() => {
  //     if (!hasCameraPermission) {
  //       checkCameraPermission();
  //     }
  //   }, [checkCameraPermission, hasCameraPermission]);

  //   console.log({ hasCameraPermission });

  const cameraRef = useRef<HTMLVideoElement>(null);

  function startCamera() {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (cameraRef.current) {
          cameraRef.current.width = window.screen.availWidth;
          cameraRef.current.height = window.screen.availHeight;
          cameraRef.current.srcObject = stream;
          cameraRef.current.play();
        }
      })
      .catch((err) => {
        console.error(err);
        alert(`${err}`);
      });
  }

  function stopCamera() {
    navigator.mediaDevices.getUserMedia({ video: false });
    // if (cameraRef.current) {
    //   // Stop all video tracks
    //   const tracks = cameraRef.current.getTracks();
    //   tracks.forEach((track) => track.stop());
    //   cameraRef.current = null; // Clear the stream reference

    //   if (cameraRef.current) {
    //     cameraRef.current.srcObject = null; // Clear the video source
    //   }
    // }
  }

  useEffect(() => {
    startCamera();

    return stopCamera;
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-8 gap-8 justify-center items-center sm:p-20 bg-black">
      <video
        ref={cameraRef}
        id="camera"
        className="absolute top-0 left-0 w-screen h-screen"
        controls={false}
      />
      <footer className="flex gap-0.5 absolute bottom-4">
        <ShareButton />
        <MicButton />
        <CameraButton />
        <Button
          variant={"destructive"}
          onClick={() => {
            window.open(`${window.location.origin}`, "_self");
          }}
        >
          Leave
        </Button>
      </footer>
    </div>
  );
}
