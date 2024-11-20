"use client";

import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useCamera = create(
  combine({
    cameraOn: false,
    hasCameraPermission: false,
  },
    (set, get) => ({
      async checkCameraPermission() {
        try {
          const permission = await navigator.permissions.query({
            name: "camera",
          });

          if (permission.state === "granted") {
            set({ hasCameraPermission: true })
          } else if (permission.state === "prompt") {
            // Request permission
            await navigator.mediaDevices.getUserMedia({
              video: true,
            });
            set({ hasCameraPermission: true })
          } else {
            set({ hasCameraPermission: false })
          }
          console.log("Camera permission:", get().hasCameraPermission);
        } catch (error) {
          console.error("Error checking camera permissions:", error);
        }
      },
      toggleCamera() {
        if (get().hasCameraPermission) {
          set((state) => ({ cameraOn: !state.cameraOn }))
        }
        // console.debug(get().hasCameraPermission)
      }
    })
  ))
