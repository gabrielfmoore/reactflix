import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SecondaryNavigationBar from "./SecondaryNavigationBar";
import { Languages } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import reactflixLogo from "../assets/REACTFLIX.png";
import TabbedPrimaryNav from "./TabbedPrimaryNav";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn =
    location.pathname === "/browse" || location.pathname === "/search";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`${isLoggedIn ? "fixed" : "absolute"} top-0 left-0 right-0 z-[100] bg-[linear-gradient(180deg,rgba(0,0,0,.7)_10%,transparent)]`}
    >
      <div className={`absolute inset-0 bg-[#141414] transition-opacity pointer-events-none ${isScrolled ? 'opacity-100 duration-100' : 'opacity-0 duration-1000'}`} aria-hidden="true" />
      <nav aria-label="Main navigation" className="relative px-[4%] flex justify-between items-center text-white h-[41px] 3xl:h-[68px]">
        <div className="flex items-center justify-center gap-4">
          <Link to={isLoggedIn ? "/browse" : "/"} tabIndex={isLoggedIn ? 0 : -1}>
            <img
              src={reactflixLogo}
              alt="Reactflix Logo"
              className={`h-[3.4vw] sm:h-[2.7vw] lg:h-[2vw] 3xl:h-[26px] w-auto ${isLoggedIn ? "" : "h-[6vw]"}`}
            />
          </Link>
          {isLoggedIn && <TabbedPrimaryNav />}
        </div>
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <div className="flex items-center text-[12px] border border-white/50 rounded-[3px] px-2 py-1 relative">
              <label htmlFor="language-select" className="sr-only">Language</label>
                <Languages className="h-4" aria-hidden="true" />
                <select
                  name="language"
                  id="language-select"
                  className="bg-[#141414] appearance-none pr-5 outline-none"
                  defaultValue="English"
                >
                  <option value="English">English</option>
                  <option value="Español">Español</option>
                </select>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  className="absolute right-2 pointer-events-none text-xs"
                  aria-hidden="true"
                />
              </div>
              <button
                className="bg-red-600 hover:bg-red-700 border-0 rounded-[3px] px-[1em] py-1 cursor-pointer text-[12px] text-nowrap sm:text-md font-extrabold inline-flex items-center gap-1 transition-all duration-300 ease-out shadow-2xl shadow-red-600/30 justify-center hover:shadow-red-600/20"
                onPointerUp={(e) => { e.preventDefault(); navigate("/browse"); }}
                aria-label="Sign in to Reactflix"
              >
                Sign In
              </button>
            </>
          ) : (
            <SecondaryNavigationBar />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
