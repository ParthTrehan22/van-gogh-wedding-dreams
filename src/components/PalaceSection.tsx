import goldenPalace from "@/assets/Fort.png";
import waterReflection from "@/assets/Water.jpeg";
import waterReflectionMiddle from "@/assets/Water2.jpeg";
import waterReflection2 from "@/assets/WaterExtended.jpeg";
import ganesha from "@/assets/Ganesha.png";

const PalaceSection = () => {
  return (
    <div className="relative w-full">
      <img
        src={goldenPalace}
        alt="Golden Indian palace"
        className="w-full h-auto object-cover block"
      />
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
        <div className="absolute top-[30%] left-0 w-full z-10 flex flex-col items-center justify-center text-center px-4 mix-blend-plus-lighter">
          <p className="font-elegant text-white text-lg sm:text-xl mb-4 tracking-wider">
            ॐ श्री गणेशाय नमः
          </p>

          <img
            src={ganesha}
            alt="Lord Ganesha"
            className="w-100 sm:w-100 h-auto object-contain mb-14"
          />

          <div className="font-upright text-white/90 space-y-8 mb-16 text-base sm:text-lg leading-loose tracking-wide">
            <p className="mb-2">With the blessings of</p>
            <p className="text-xl sm:text-2xl text-white font-medium">Smt. Sushila & Sh. Ram Kishore Khandelwal</p>
            <p className="text-sm tracking-[0.3em] uppercase my-6">and</p>
            <p className="text-xl sm:text-2xl text-white font-medium">Mrs. Ruchika & Mr. Rajesh Khandelwal</p>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl text-white mb-6 tracking-widest">
            WE INVITE
          </h2>

          <p className="font-upright text-white/90 text-lg sm:text-xl mb-8">
            You to join us in the wedding celebrations of
          </p>

          <div className="font-display text-5xl sm:text-7xl text-white text-shadow-glow leading-tight flex flex-col gap-2">
            <span>Srishti</span>
            <span className="text-3xl sm:text-5xl opacity-80">&</span>
            <span>Parth</span>
          </div>

          <div className="mt-8 pb-32 flex flex-col gap-2 items-center font-upright">
            <p className="text-xl sm:text-2xl text-white font-medium text-center">
              S/o Mrs. Rama & Mr. Dinesh Trehan
            </p>
            <p className="text-sm tracking-[0.3em] uppercase my-6">and</p>
            <p className="text-xl sm:text-2xl text-white font-medium text-center">
              GS/o Mrs. Nirmal Rani & Mr. Shyam Sunder Trehan
            </p>
          </div>

          <p className="font-elegant text-white/90 text-lg sm:text-xl mb-24 italic tracking-wider">
            On the following events
          </p>
        </div>
      </div>
    </div>
  );
};

export default PalaceSection;
