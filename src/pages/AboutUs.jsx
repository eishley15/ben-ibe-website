import React from "react";
import FooterRed from "../components/FooterRed";

const AboutUs = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8F0" }}>
      {/* Main Content */}
      <section className="bg-[#FFF8F0] py-12 px-6 md:px-16 lg:px-24 w-full">
        <div className="flex w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center align-middle h-screen">
          {/* Left Column - Text Content */}
          <div className="flex m-10 p-10 justify-center flex-col !pl-24 !ml-16">
            <h2 className="text-[#9C322B] text-6xl md:text-7xl font-bold mb-6 tracking-tighter uppercase">
              About Us.
            </h2>
            <br />
            <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
              At Ben Ibe Flowers, we have proudly served our customers{" "}
              <span className="font-semibold text-gray-900">since 1985</span>,
              establishing a strong reputation as a reliable and dedicated
              flower business in Angeles City.
            </p>
            <br />
            <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
              <span className="font-semibold text-gray-900">
                Founded by Bienvenido Ibe and Purita Ibe
              </span>
              , our shop has remained a family-run establishment, ensuring that
              our values of quality and customer care are passed down through
              generations. Today, we are managed by the next generation of the
              Ibe family, who continue to uphold our commitment to creating
              beautiful floral arrangements and personalized gifts for all
              occasions.
            </p>
            <br />
            <p className="text-gray-800 text-base md:text-lg leading-relaxed">
              Thank you for choosing Ben Ibe Flowers,{" "}
              <span className="text-red-600">
                where every arrangement is crafted with love and care!
              </span>
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center">
            <img
              src="/aboutus.png"
              alt="Beautiful flower bouquet with red roses"
              className="object-cover w-full max-w-lg"
            />
          </div>
        </div>
      </section>

      <FooterRed />
    </div>
  );
};

export default AboutUs;
