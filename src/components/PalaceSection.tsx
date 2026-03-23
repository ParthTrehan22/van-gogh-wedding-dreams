import React from "react";
import goldenPalace from "@/assets/Fort.png";
import waterReflection from "@/assets/Water.jpeg";
import waterReflectionMiddle from "@/assets/Water2.jpeg";
import waterReflection2 from "@/assets/WaterExtended.jpeg";
import ganesha from "@/assets/Ganesha.png";
import varmalaImg from "@/assets/VarmalaGhibli.png";
import { getSideContent } from "@/config/sideContent";

const { nameFirst, nameSecond, blessings, parents } = getSideContent();

const PalaceSection = () => {
  return (
    <div className="relative w-full">
      <div className="relative">
        <img
          src={goldenPalace}
          alt="Golden Indian palace"
          className="w-full h-auto object-cover block"
        />

        {/* Varmala Ghibli Image on Balcony - Positioned relative to the palace image */}
        <img
          src={varmalaImg}
          alt="Couple with Varmala on balcony"
          className="absolute top-[58%] left-1/2 -translate-x-1/2 w-32 sm:w-24 md:w-32 z-10 object-contain drop-shadow-xl"
        />
      </div>

      <div className="relative">
        <img
          src={waterReflection}
          alt="Water reflection"
          className="w-full h-auto object-cover block relative z-10"
        />
        {/* Blending Gradient to fix seam */}
        <div className="absolute w-full h-32 -mt-16 z-20 bg-gradient-to-b from-transparent via-[#40E0D0]/40 to-transparent" />

        <img
          src={waterReflectionMiddle}
          alt="Water reflection middle"
          className="w-full h-auto object-cover block relative z-0"
        />

        <img
          src={waterReflection2}
          alt="Extended Water reflection"
          className="w-full h-auto object-cover block relative z-0"
          style={{
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
          }}
        />
        {/* Ganesha & Invitation Overlay */}
        <div className="absolute top-[22%] left-0 w-full z-10 flex flex-col items-center justify-center text-center px-4 mix-blend-plus-lighter">
          <p className="font-elegant text-white text-lg sm:text-xl mb-4 tracking-wider">
            ॐ श्री गणेशाय नमः
          </p>

          <img
            src={ganesha}
            alt="Lord Ganesha"
            className="w-100 sm:w-100 h-auto object-contain mb-14"
          />

          <div className="font-upright text-white/90 space-y-7 mb-12 text-base sm:text-lg leading-loose tracking-wide">
            <p className="mb-2">With the blessings of</p>
            {blessings.lines.map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <p className="text-sm tracking-[0.3em] uppercase my-6">and</p>}
                <p className="text-xl sm:text-2xl text-white font-medium">{line.name}</p>
              </React.Fragment>
            ))}
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-white mb-6 tracking-widest">
            WE INVITE
          </h2>

          <p className="font-upright text-white/90 text-lg sm:text-xl mb-8">
            You to join us in the wedding celebrations of
          </p>

          <div className="font-display text-5xl sm:text-7xl text-white text-shadow-glow leading-tight flex flex-col gap-2">
            <span>{nameFirst}</span>
            <span className="text-3xl sm:text-5xl opacity-80">&</span>
            <span>{nameSecond}</span>
          </div>

          <div className="mt-6 pb-8 flex flex-col gap-2 items-center font-upright">
            {parents.lines.map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <p className="text-sm tracking-[0.3em] uppercase my-6">and</p>}
                <p className="text-xl sm:text-2xl text-white font-medium text-center">
                  {line.prefix} {line.name}
                </p>
              </React.Fragment>
            ))}
          </div>

          <p className="font-elegant text-white/90 text-lg sm:text-xl mb-4 italic tracking-wider">
            On the following events
          </p>
        </div>
      </div>
    </div>
  );
};

export default PalaceSection;
