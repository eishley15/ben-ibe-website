const FeatureSection = () => {
  return (
    <section className="bg-[#FDF6EC] py-12 px-6 md:px-16 lg:px-24 w-full h-screen">
      <div className="flex w-full h-screen mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center align-middle">
        {/* Left Text Side */}
        <div className="flex justify-center">
          <img
            src="/feature-hero.png"
            alt="Bouquet from Ben Ibe Flowers"
            className="rounded-lg object-cover w-full max-w-md"
          />
        </div>

        {/* Right Image Side */}
        <div className="flex m-10 p-10 justify-center flex-col !pr-32 !mr-32">
          <h2 className="text-[#9C322B] text-6xl md:text-7xl font-bold mb-6 tracking-tighter">
            Our Story.
          </h2>
          <br />
          <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
            From the very beginning, every piece we’ve created has carried more
            than just flowers—it has carried a story.
          </p>
          <br />
          <p className="text-gray-800 text-base md:text-lg leading-relaxed mb-4">
            Through the years, our blooms have marked moments of love,
            farewells, and joyful celebrations.
          </p>
          <br />
          <p className="text-gray-800 text-base md:text-lg leading-relaxed">
            Each creation has been rooted in thoughtfulness, care, and the
            simple joy that beauty brings. And just like the moments they
            represent, no two have ever been the same—because no two stories are
            alike.
          </p>
          <br />
          <p className="text-gray-800 text-base md:text-lg leading-relaxed">
            We invite you to journey through the blooms we’ve lovingly crafted,
            and feel the meaning behind every petal.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
