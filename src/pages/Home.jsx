import "../css/Home.css";
import Service from "../components/ServicesSection";
import InfoGrid from "../components/GridSection";
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function Home() {
  const services = [
    {
      id: 1,
      title: "FRESH FLOWER ARRANGEMENTS",
      description:
        "We craft fresh flower arrangements that celebrate the natural beauty of every bloom. From timeless bouquets and heartfelt sympathy tributes to everyday gifting and simple gestures of love, each hand-tied design is thoughtfully crafted to bring warmth, joy, and meaning to your day.",
      image: "/fresh-flower.png",
      alt: "Fresh flower arrangement with pink and red flowers",
    },
    {
      id: 2,
      title: "DRIED FLOWER ARRANGEMENTS",
      description:
        "We offer long-lasting dried flower arrangements that add a touch of charm to your home decor or make thoughtful gifts. Our unique designs preserve the beauty of flowers, ensuring they remain a delightful reminder of cherished memories.",
      image: "/dried-flower.png",
      alt: "Dried flower arrangement in red wrapping",
    },
    {
      id: 3,
      title: "CUSTOM BALLOON",
      description:
        "We provide custom balloon arrangements that can be tailored to fit any celebration. Whether you want to add a festive touch to a party or surprise someone special, our balloons can be combined with floral designs or stand alone for a vibrant display.",
      image: "/balloon.png",
      alt: "Custom balloon arrangement with flowers",
    },
    {
      id: 4,
      title: "DOME DISPLAYS & PERSONALIZED GIFTS",
      description:
        "We specialize in unique dome flower displays and personalized gifts that make memorable presents. Our handcrafted preserved flower domes are perfect for showcasing the beauty of flowers while our customized gifts add a personal touch to any occasion.",
      image: "/dome-display.png",
      alt: "Dome display with preserved flowers",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section w-full h-screen">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Ben</h1>
            <p className="hero-subtitle">
              Make Every Moment
              <br />
              Special With Flowers.
            </p>
            <Link to="/products" className="hero-cta-btn">
              Shop Now
            </Link>
          </div>
          <div className="hero-image">
            <img
              src="/hero.png"
              alt="Beautiful flower bouquet"
              className="bouquet-image"
            />
            <div className="hero-badge">Ibe.</div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <img
          src="/pink-flowers.png"
          alt="pink-flowers"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#9C322B]/60"></div>

        <div className="relative h-full flex flex-col items-center justify-center px-8 md:px-16 lg:px-24 text-center">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight max-w-4xl">
            WHERE FLOWERS BLOOM,
            <br />
            STORIES START
          </h1>
          <br />
          <p className="text-white text-lg md:text-l lg:text-xl max-w-2xl leading-relaxed font-bold max-w-0 mt-4">
            Since 1985, Ben Ibe Flowers has been a family-run shop, specializing
            in beautiful fresh and dried floral arrangements for all occasions.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-gray-50 flex justify-center">
        <div className="max-w-7xl w-full">
          <br />
          <br />
          <br />
          <h2 className="text-[#A89F53] text-2xl mt-24 md:text-3xl font-bold tracking-wider mb-4 px-10 md:px-16 lg:px-24 left-10 text-left p-8 absolute">
            services
          </h2>
          <br />
          <div className="space-y-16">
            {services.map((services) => (
              <Service
                key={services.id}
                title={services.title}
                description={services.description}
                image={services.image}
                alt={services.alt}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <InfoGrid />

      {/* About Us Section */}
      <AboutSection />

      {/* CTA Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <img
          src="/pink-tulips.png"
          alt="pink-flowers"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#9C322B]/60"></div>

        <div className="relative h-full flex flex-col items-center justify-end px-8 md:px-16 lg:px-24 text-center !py-32">
          <Link
            to="/products"
            className="bg-[#A89F53] !text-[#FFF8F0] !px-6 !py-3 rounded-lg font-bold hover:bg-[#8f8746] transition"
          >
            Shop Now
          </Link>
          <br />
          <p className="text-white text-3xl md:text-4xl lg:text-4 xl max-w-2xl font-black tracking-tighter leading-tight font-bold max-w-0 mt-4">
            To craft the perfect arrangement. <br /> Reach out to us.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default Home;
