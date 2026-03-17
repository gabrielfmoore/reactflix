import { Volume2, VolumeX } from "lucide-react";

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

export default function MuteButton({ isMuted, onToggle }: MuteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full border border-white/80 bg-transparent hover:bg-white/10 transition"
      aria-label={isMuted ? "Unmute" : "Mute"}
    >
      {isMuted ? <VolumeX className="w-[1em] h-[1em]" /> : <Volume2 className="w-[1em] h-[1em]" />}
    </button>
  );
}
