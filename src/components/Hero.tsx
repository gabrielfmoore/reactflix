import heroBg from "../assets/hero-background.jpg";
import { ChevronRight } from "lucide-react";
import CurvedLine from "./CurvedLine";

const Hero = () => {
  return (
    <section
      aria-label="Sign up for Reactflix"
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden w-full bg-gradient-to-br from-[#141414] via-gray-900 to-[#141414]"
    >
      <img
        src={heroBg}
        alt=""
        className="absolute top-0 left-0 right-0 bottom-[1px] w-full h-auto object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#141414]/95 via-[#141414]/70 to-[#141414]/95 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 text-center max-w-[500px] flex flex-col items-center w-full">
        <div className="text-white">
          <h1 className="text-4xl [font-family:var(--font-roboto)] md:text-5xl lg:text-6xl leading-tight mb-2 drop-shadow-lg font-[1000]">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="sm:text-sm md:text-lg opacity-90 mb-6">
            Starts at $7.99. Cancel anytime.
          </p>
          <p className="sm:text-sm md:text-xs opacity-90 mt-2 mb-3">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form
            className="flex gap-2 justify-center items-center w-full"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Sign up"
          >
            <label htmlFor="hero-email" className="sr-only">Email address</label>
            <input
              id="hero-email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              className="flex-1 px-4 py-2 border border-white-100 rounded-[3px]"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 border-0 rounded-[3px] px-0 py-2 cursor-pointer text-xl font-extrabold inline-flex items-center gap-1 transition-all duration-300 ease-out shadow-2xl shadow-red-600/30 min-w-[160px] justify-center hover:shadow-red-600/20"
            >
              Get Started <ChevronRight aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
      <div className="absolute bottom-[19px] left-0 w-full h-[20px] bg-transparent z-100" aria-hidden="true">
        <CurvedLine />
      </div>
      <div className="absolute bottom-0 w-full h-[20px] bg-[#141414]" aria-hidden="true"></div>
    </section>
  );
};

export default Hero;
