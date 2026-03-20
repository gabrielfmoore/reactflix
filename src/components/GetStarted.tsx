import heroBg from "../assets/hero-background.jpg";
import popcorn from "../assets/popcorn.png";
import { ChevronRight } from "lucide-react";
import CurvedLine from "./CurvedLine";
import TrendingNow from "./TrendingNow";

const GetStarted = () => {
  return (
    <section
      aria-label="Sign up for Reactflix"
      className="relative min-h-screen w-full bg-gradient-to-br from-[#141414] via-gray-900 to-[#141414]"
    >
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#141414]/95 via-[#141414]/70 to-[#141414]/95"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-center sm:justify-center sm:min-h-screen pt-20 sm:pb-[60px] px-[7%] text-center text-white">
        <div className="max-w-[500px] w-full">
          <h1 className="text-4xl md:text-5xl lg:text-6xl [font-family:var(--font-roboto)] leading-tight mb-2 drop-shadow-lg font-[1000]">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="md:text-lg opacity-90 mb-6">
            Starts at $7.99. Cancel anytime.
          </p>
          <p className="text-sm opacity-90 mt-2 mb-3">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form
            className="flex flex-col justify-center items-center sm:flex-row gap-2 w-full"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Sign up"
          >
            <label htmlFor="hero-email" className="sr-only">
              Email address
            </label>
            <input
              id="hero-email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              className="flex-1 w-full px-4 py-2 border border-white/30 rounded-[3px]"
            />
            <button
              type="submit"
              className="bg-red-600 w-[45%] mt-2 sm:mt-0 hover:bg-red-700 rounded-[3px] py-2 cursor-pointer text-xl font-extrabold inline-flex items-center gap-1 transition-all duration-300 shadow-2xl shadow-red-600/30 min-w-[160px] justify-center hover:shadow-red-600/20"
            >
              Get Started <ChevronRight aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
      <div
        className="relative mt-20 sm:mt-0 sm:absolute sm:bottom-[19px] left-0 w-full h-auto sm:h-[20px] z-10"
        aria-hidden="true"
      >
        <CurvedLine />
        <div className="relative sm:absolute sm:top-full left-0 w-full bg-[#141414] pt-[40px]">
          <div className="h-15 bg-[#141414] flex items-center justify-center mb-40">
            <div className="@container relative max-w-[700px] w-full px-4 py-6 mt-32 ml-[4%] sm:ml-[60px] mr-[4%] rounded-lg text-white flex flex-col sm:flex-row flex-wrap items-start justify-between text-center bg-gradient-to-r from-[#600c65]/30 via-[#360984]/40 to-[#06356c]/50 hover:scale-[1.02] transition-[scale] duration-300">
              <img
                src={popcorn}
                alt=""
                className="absolute h-[60px] w-auto top-[-44px] sm:top-2 sm:left-[-54px] "
              />
              <div className="flex flex-col text-wrap sm:text-nowrap text-left mr-4">
                <h1 className="text-xl font-bold">
                  The Netflix you love for just $7.99.
                </h1>
                <p className="text-[15px]">
                  Get our most affordable, ad-supported plan.
                </p>
              </div>
              <button className="text-lg mt-1.5 text-nowrap px-[16px] py-[6px] bg-gray-700/80 rounded-sm cursor-pointer hover:bg-gray-700/50 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
          <TrendingNow />
          <div className="mx-[4%] my-14 text-white/70 gap-4 text-[13px] flex flex-col font-thin bg-[#141414]">
          <p className="font-normal text-white">Ready to watch? Enter your email to create or restart your membership.</p>
            <form
              className="flex justify-center items-center gap-2 justify-between w-full max-w-[650px] mx-auto "
              onSubmit={(e) => e.preventDefault()}
              aria-label="Sign up"
            >
              <label htmlFor="hero-email" className="sr-only">
                Email address
              </label>
              <input
                id="hero-email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
                className="flex-1 w-full px-4 py-[12px] border border-white/30 rounded-[3px]"
              />
              <button
                type="submit"
                className="bg-red-600 w-[45%] hover:bg-red-700 rounded-[3px] py-2 cursor-pointer text-xl font-extrabold inline-flex items-center gap-1 transition-all duration-300 shadow-2xl shadow-red-600/30 min-w-[160px] justify-center hover:shadow-red-600/20"
              >
                Get Started <ChevronRight aria-hidden="true" />
              </button>
            </form>
            <div className="my-6">
              Questions? Call <span className="underline">1-800-123-4567</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-10 underline gap-y-2">
              <div>FAQ</div>
              <div>Help Center</div>
              <div>Account</div>
              <div>Investor Relations</div>
              <div>Jobs</div>
              <div>Reactflix Shop</div>
              <div>Redeem Gift Cards</div>
              <div>Buy Gift Cards</div>
              <div>Ways to Watch</div>
              <div>Terms of Use</div>
              <div>Privacy</div>
              <div>Cookie Preferences</div>
              <div>Corporate Information</div>
              <div>Contact Us</div>
              <div>Speed Test</div>
              <div>Legal Notices</div>
              <div>Only on Reactflix</div>
              <div>Do Not Sell My Personal Information</div>
              <div>Ad Choices</div>
            </div>
            <p className="text-[10px] ">This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className="underline text-blue-800">Learn more.</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
