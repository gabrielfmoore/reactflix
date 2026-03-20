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
      className="rounded-full border border-white/50 bg-transparent text-white/50 hover:bg-white/10 hover:border-white hover:text-white transition hover:text-white"
      style={{ padding: `calc(${iconSize} * 0.5)` }}
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <VolumeX style={{ width: iconSize, height: iconSize }} /> : <Volume2 style={{ width: iconSize, height: iconSize }} />}
    </button>
  );
}
