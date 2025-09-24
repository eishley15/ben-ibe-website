const AboutSection = () => {
  return (
    <section className="bg-[#FDF6EC] py-16 px-6 md:px-16 lg:px-24 w-full h-screen">
      <div className="flex w-full h-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center align-middle">
        {/* Left Text Side */}
        <div className="flex m-10 p-10 justify-center flex-col !mx-24">
          <h2 className="text-[#9C322B] text-5xl md:text-6xl font-bold mb-6 tracking-tighter">
            ABOUT US.
          </h2>
          <br />
          <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
            At Ben Ibe Flowers, we have proudly served our customers{" "}
            <span className="font-semibold">since 1985</span>, establishing a
            strong reputation as a reliable and dedicated flower business in
            Angeles City.
          </p>
          <br />
          <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
            <span className="font-semibold">
              Founded by Bienvenido Ibe and Purita Ibe
            </span>
            , our shop has remained a family-run establishment, ensuring that
            our values of quality and customer care are passed down through
            generations. Today, we are managed by the next generation of the Ibe
            family, who continue to uphold our commitment to creating beautiful
            floral arrangements and personalized gifts for all occasions.
          </p>
          <br />
          <p className="text-gray-900 font-semibold text-base md:text-lg leading-relaxed">
            Thank you for choosing Ben Ibe Flowers, <br />
            where every arrangement is crafted with love and care!
          </p>
        </div>

        {/* Right Image Side */}
        <div className="flex justify-center">
          <img
            src="/about.png"
            alt="Bouquet from Ben Ibe Flowers"
            className="rounded-lg shadow-lg object-cover w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
