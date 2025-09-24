const InfoGrid = () => {
  return (
    <section className="grid grid-cols-4 grid-rows-3 gap-0 w-full h-screen">
      {/* Row 1 */}
      <div className="aspect-square">
        <img
          src="/flower1.png"
          alt="flowers"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-[#9C322B] flex items-center justify-center text-white font-bold p-4 text-center">
        sto. rosario,
        <br />
        st. corner lakandula,
        <br />
        angeles city
      </div>
      <div>
        <img
          src="/flower2.png"
          alt="flowers"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-[#A89F53] flex items-center justify-center text-white font-bold p-4">
        delivery available
      </div>

      {/* Row 2 */}
      <div className="bg-[#D9A7A0] flex items-center justify-center text-white font-bold">
        monday to saturday
      </div>
      <div>
        <img
          src="/flower3.png"
          alt="flowers"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-[#FDF6EC] flex items-center justify-center text-[#9C322B] font-bold">
        8:00am to 6:30pm
      </div>
      <div>
        <img
          src="/flower4.png"
          alt="flowers"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Row 3 */}
      <div>
        <img
          src="/flower5.png"
          alt="flowers"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-[#A89F53] flex items-center justify-center text-white font-bold">
        8:00am to 6:00pm
      </div>
      <div className="bg-[#9C322B] flex items-center justify-center">
        <img
          src="/benibe.png"
          alt="Ben Ibe Flowers Logo"
          className="w-32 h-auto"
        />
      </div>
      <div className="bg-[#D9A7A0] flex items-center justify-center text-white font-bold">
        sunday
      </div>
    </section>
  );
};

export default InfoGrid;
