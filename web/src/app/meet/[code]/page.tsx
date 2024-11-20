"use client";

import { Camera } from "@/components/camera";
import { CameraButton } from "@/components/camera-button";
import { MicButton } from "@/components/mic-button";
import { ShareButton } from "@/components/share-button";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default function Meeting() {
  const msg = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("message", (data: string) => {
      console.log("Message from socket:", data);
      // msg.current?.innerHTML = data;
      // setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen p-8 gap-8 justify-center items-center sm:p-20 bg-black">
      <Camera className="absolute top-0 left-0 w-screen h-screen" />
      <h1 ref={msg} className="z-50"></h1>
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
