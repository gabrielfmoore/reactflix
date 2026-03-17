import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Pencil, SendToBack, User, BadgeQuestionMark } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const profiles = [
  { name: "Gabriel", color: "bg-red-600" },
  { name: "Elizabeth", color: "bg-blue-500" },
  { name: "Kids", color: "bg-yellow-400" },
];

export default function AccountDropdownButton() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div className="relative flex flex-col flex-shrink-0 mr-[-0.1em]"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div>
        <div className="flex">
          <button className="relative bg-red-600 h-[34px] w-[34px] rounded-[4px] text-white font-bold text-xl">
            G
          </button>
          <button className={`hidden 3xl:block ml-1 transition-all duration-300 ${open ? "rotate-180" : "rotate-0"}`}>
            <FontAwesomeIcon
              icon={faCaretDown}
              style={{ color: "rgb(255, 255, 255)" }}
            />
          </button>
        </div>
      </div>
      {open && (
        <div className="absolute top-full right-0">
          <div className="flex justify-end">
            <div className="mr-[32px] mt-[10px] mb-[-6px] flex justify-end items-end">
              <FontAwesomeIcon
                icon={faCaretUp}
                style={{ color: "rgb(255, 255, 255)" }}
              />
            </div>
          </div>
          <div className="flex flex-col w-[220px] border border-white/40 border-[1px] bg-[#141414] text-white/85 text-[12px]">
            <ul className="flex flex-col pt-[10px] pb-[5px] w-full text-[13px] font-thin">
              {profiles.map((p) => (
                <li key={p.name} className="flex items-center gap-3 px-[10px] py-[6px] hover:underline cursor-pointer">
                  <div className={`h-8 w-8 rounded-[4px] ${p.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {p.name[0]}
                  </div>
                  <span>{p.name}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col pt-5 pb-4 px-[16px] justify-between border-y border-white/40 gap-3">
              <button className="flex items-center gap-2 text-white/80 text-[13px] font-thin hover:text-white">
                <Pencil />
                Manage Profiles
              </button>
              <button className="flex items-center gap-2 text-white/80 text-[13px] font-thin hover:text-white">
                <SendToBack />
                Transfer Profile
              </button>
              <button className="flex items-center gap-2 text-white/80 text-[13px] font-thin hover:text-white">
                <User />
                Account
              </button>
              <button className="flex items-center gap-2 text-white/80 text-[13px] font-thin hover:text-white">
                <BadgeQuestionMark />
                Help Center
              </button>
            </div>
            <div >
              <Link to="/" className="flex items-center justify-center h-12 text-white/85 hover:text-white font-thin">
                Sign Out of Netflix
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
      
