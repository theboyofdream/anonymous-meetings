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
                        get().hasCameraPermission = true;
                    } else if (permission.state === "prompt") {
                        // Request permission
                        const stream = await navigator.mediaDevices.getUserMedia({
                            video: true,
                        });
                        get().hasCameraPermission = true;
                        // Stop all tracks to release the camera
                        stream.getTracks().forEach((track) => track.stop());
                    } else {
                        get().hasCameraPermission = false;
                    }
                } catch (error) {
                    console.error("Error checking camera permissions:", error);
                }
            },
            toggleCamera() {
                if (get().hasCameraPermission) {
                    set(() => ({ cameraOn: !get().cameraOn }))

                }
            }
        })
    ))
