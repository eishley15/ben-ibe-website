// src/pages/ContactUs.jsx

import React, { useState } from "react";
import FooterRed from "../components/FooterRed";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    // Use import.meta.env for Vite
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  // This part of your code is not needed because Vite handles environment variables differently
  // const GOOGLE_MAPS_API_KEY =
  //   process.env.NODE_ENV === "development"
  //     ? "AIzSsyAbydlaBeSUE-OdE1IqfuCsWAS4qx3lLqT"
  //     : process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (loadError) {
    console.error("Google Maps failed to load:", loadError);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Failed to send message. Please try again later.");
    }
  };

  return (
    <div className="bg-[#FFF8F0] min-h-screen flex flex-col">
      <main className="container !mx-auto !py-12 flex-grow !px-4">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center max-w-6xl !mx-auto">
          <div className="w-full md:w-1/2 !p-8 rounded-lg">
            <h1 className="text-4xl font-bold text-left text-[#9C332A]">
              Contact Us
            </h1>
            <h2 className="text-2xl font-semibold mb-4 text-[#9C332A]">
              Get In Touch
            </h2>
            <p className="text-gray-600 !mb-6">
              Drop, call or write to us for detailed inquiries, event bookings,
              or collaboration opportunities, we'll get back to you shortly.
            </p>
            <div className="space-y-4">
              <p className="flex items-center space-x-2 text-gray-700">
                <span className="text-[#9C332A]">
                  <img
                    src="/gps.png"
                    alt="marker icon"
                    className="h-6 w-6 !m-2"
                  />
                </span>
                <span>Sto. Rosario, St. Corner Lakandula, Angeles City.</span>
              </p>
              <p className="flex items-center space-x-2 text-gray-700">
                <span className="text-[#9C332A]">
                  <img
                    src="/phone-call.png"
                    alt="phone icon"
                    className="h-6 w-6 !m-2"
                  />
                </span>
                <span>(0969) 200 8028</span>
              </p>
              <p className="flex items-center space-x-2 text-gray-700">
                <span className="text-[#9C332A]">
                  <img
                    src="/email.png"
                    alt="email icon"
                    className="h-6 w-6 !m-2"
                  />
                </span>
                <span>benibeflowers@gmail.com</span>
              </p>
            </div>
            <div className="!mt-8 rounded-lg overflow-hidden shadow-lg">
              {loadError ? (
                <div className="w-full h-96 bg-red-100 flex items-center justify-center border border-red-300">
                  <div className="text-center">
                    <p className="text-red-600 font-semibold">
                      Failed to load Google Maps
                    </p>
                    <p className="text-red-500 text-sm mt-2">
                      Please check your API key
                    </p>
                  </div>
                </div>
              ) : !isLoaded ? (
                <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9C332A] mx-auto !mb-4"></div>
                    <p className="text-gray-600">Loading Map...</p>
                  </div>
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "300px",
                    borderRadius: "0.5rem",
                  }}
                  center={{ lat: 15.1338078636916, lng: 120.59204218311228 }}
                  zoom={15}
                  options={{
                    zoomControl: true,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: true,
                  }}
                >
                  <Marker
                    position={{
                      lat: 15.1338078636916,
                      lng: 120.59204218311228,
                    }}
                    title="Ben Ibe Flowers - Angeles City"
                  />
                </GoogleMap>
              )}
            </div>
            <div className="flex flex-row">
              <a href="https://www.facebook.com/BenIbeFlowers" target="_blank">
                <img
                  src="/facebook.png"
                  alt="facebook icon"
                  className="h-10 w-10 !m-2"
                />
              </a>
              <a
                href="https://www.instagram.com/benibeflowers_ph?utm_source=ig_web_button_share_sheet&igsh=dHJvZjNmamlvNXl3"
                target="_blank"
              >
                <img
                  src="/instagram.png"
                  alt="instagram icon"
                  className="h-10 w-10 !m-2"
                />
              </a>
              <a
                href="https://www.tiktok.com/@benibeflowersph?_t=ZS-8zzuBfIgBIQ&_r=1"
                target="_blank"
              >
                <img
                  src="/tiktok.png"
                  alt="tiktok icon"
                  className="h-10 w-10   !m-2"
                />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 !p-8 bg-[#9C332A] text-white rounded-lg shadow-xl h-max">
            <h2 className="text-4xl font-semibold !mb-10 tracking-tighter text-[#FFF8F0]">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="!mb-6">
                <label
                  htmlFor="name"
                  className="text-[FFF8F0] font-light tracking-tighter"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full !p-3 bg-none text-[#FFF8F0] bg-opacity-20 placeholder-gray-700 focus:outline-none focus:bg-opacity-30 border-b-1 border-[#FFF8F0] focus:border-b-2 focus:border-[#FFF8F0]"
                />
              </div>
              <div className="!mb-6">
                <label
                  htmlFor="email"
                  className="text-[FFF8F0] font-light tracking-tighter"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full !p-3 bg-none text-[#FFF8F0] bg-opacity-20 placeholder-gray-700 focus:outline-none focus:bg-opacity-30 border-b-1 border-[#FFF8F0] focus:border-b-2 focus:border-[#FFF8F0]"
                />
              </div>
              <div className="!mb-6">
                <label
                  htmlFor="message"
                  className="text-[FFF8F0] font-light tracking-tighter"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows="7"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full !p-3 bg-none text-[#FFF8F0] bg-opacity-20 placeholder-gray-700 focus:outline-none focus:bg-opacity-30 border-b-1 border-[#FFF8F0] focus:border-b-2 focus:border-[#FFF8F0] resize-vertical"
                ></textarea>
              </div>
              <div className="!mb-4">
                <p className="font-light">
                  By submitting this form, you agree to the processing of your
                  details for your order, inquires and related services.
                </p>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={status === "Sending..."}
                  className="w-1/2 bg-[#FFF8F0] text-[#9C332A] !py-3 rounded-md font-bold transition-colors duration-200 hover:bg-[#D4A385] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status || "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <FooterRed />
    </div>
  );
};

export default ContactUs;
