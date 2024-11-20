"use client";

import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useMic = create(
  combine({
    micOn: false,
    hasMicPermission: false,
  },
    (set, get) => ({
      async checkMicPermission() {
        try {
          const permission = await navigator.permissions.query({
            name: "microphone",
          });
          if (permission.state === "granted") {
            set({ hasMicPermission: true })
          } else if (permission.state === "prompt") {
            // Request permission
            await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            set({ hasMicPermission: true })
          } else {
            set({ hasMicPermission: false })
          }
        } catch (error) {
          console.error("Error checking microphone permissions:", error);
        }
      },
      toggleMic() {
        if (get().hasMicPermission) {
          set((state) => ({ micOn: !state.micOn }))
        }
      }
    })
  ))
