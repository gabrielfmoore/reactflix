import { Volume2, VolumeX } from "lucide-react";

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
  iconSize?: string;
}

export default function MuteButton({ isMuted, onToggle, iconSize = "1em" }: MuteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="rounded-full border border-white/80 bg-transparent hover:bg-white/10 transition"
      style={{ padding: `calc(${iconSize} * 0.5)` }}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <VolumeX style={{ width: iconSize, height: iconSize }} /> : <Volume2 style={{ width: iconSize, height: iconSize }} />}
    </button>
  );
}
