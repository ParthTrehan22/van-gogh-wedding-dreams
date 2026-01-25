import goldenPalace from "@/assets/Fort.png";

const PalaceSection = () => {
  return (
    <div className="relative w-full">
      <img
        src={goldenPalace}
        alt="Golden Indian palace"
        className="w-full h-auto object-cover block"
      />
    </div>
  );
};

export default PalaceSection;
