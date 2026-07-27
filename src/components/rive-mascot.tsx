"use client";

import { useRive } from "@rive-app/react-canvas";
import { useEffect, useState } from "react";

interface RiveMascotProps {
  onLoad?: () => void;
  onError?: () => void;
}

const RIVE_SRC = "/rive/mascot.riv";

export function RiveMascot({ onLoad, onError }: RiveMascotProps) {
  const [hovered, setHovered] = useState(false);

  const { rive, RiveComponent } = useRive({
    src: RIVE_SRC,
    stateMachines: "Wave",
    autoplay: true,
  });

  useEffect(() => {
    if (rive && onLoad) onLoad();
  }, [rive, onLoad]);

  useEffect(() => {
    if (!rive) return;
    const inputs = rive.stateMachineInputs("Wave");
    const waveInput = inputs?.find((i) => i.name === "wave");
    if (!waveInput) return;
    waveInput.value = hovered;
  }, [hovered, rive]);

  // If the .riv file is missing, Rive emits an error — surface it so the hero can fall back.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!rive && onError) onError();
    }, 1500);
    return () => clearTimeout(t);
  }, [rive, onError]);

  return (
    <div
      className="h-24 w-24 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Animated mascot"
    >
      <RiveComponent />
    </div>
  );
}