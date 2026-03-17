import { Bell } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function Notifications() {
  return (
    <div className="group relative">
      <button className="text-white px-[6px] pt-[2px] pb-[3px]">
        <Bell size={22} className="scale-x-110 translate-y-1" />
      </button>
      <div className="absolute h-[40%] w-[40%] bg-red-600 rounded-full top-0 right-0 flex items-center justify-center text-[60%]">
        1
      </div>
      <div className="hidden group-hover:block absolute top-full right-0 w-[410px]">
        <div className="flex justify-end pr-1.5 h-[25px] items-end">
          <FontAwesomeIcon
            icon={faCaretDown}
            style={{ color: "rgb(255, 255, 255)", transform: "scaleX(-1.3) scaleY(-1.2)" }}
          />
        </div>
        <div className="w-full bg-white h-[2px] -mt-[4px]"></div>
        <div className="flex h-[98px] border border-white/40 border-[1px] text-white/85 text-sm">
          <img
            src="https://image.tmdb.org/t/p/original/zEewiIVx9rDfc1HahWPNk4uyJdP.png"
            alt="Interstellar Logo"
            className={"bg-[#141414] p-[10px] w-[180px] h-[98px]"}
          />
          <div className="flex flex-col p-[16px] h-[98px] w-full text-[16px] bg-[#141414]/90 font-thin -translate-x-[1px] hover:bg-[#141414] hover:text-white">
            <h1>New Arrival</h1>
            <h1>Interstellar</h1>
            <h1 className="mt-[1px] text-white/70 text-[12px]">4 day ago</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
