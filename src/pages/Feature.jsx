import FeatureSection from "../components/FeatureSection";
import CarouselSection from "../components/CarouselSection";
import BehindBlooms from "../components/BehindBlooms";
import FooterRed from "../components/FooterRed";

function Feature() {
  return (
    <div>
      {/* Hero Section */}
      <section>
        <FeatureSection />
      </section>

      {/* Carousel Section */}
      <section>
        <CarouselSection />
      </section>

      {/* Behind Blooms Section */}
      <section>
        <BehindBlooms />
      </section>

      {/* Footer Section */}
      <section>
        <FooterRed />
      </section>
    </div>
  );
}

export default Feature;
