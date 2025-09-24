// Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-[#FFF8F0] !py-8 !px-6 md:px-16 lg:px-24">
      <div className="mx-auto w-full">
        {/* Flex container: stacks on mobile, three equal columns on md+ */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between !mx-6 gap-10 md:gap-10">
          {/* Left - takes 1/3 of width on md+ */}
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">BEN IBE</h3>
            <p className="text-sm leading-relaxed">
              Sto.Rosario, St. Corner Lakandula,
              <br />
              Angeles City. © All rights reserved.
            </p>
          </div>

          {/* Center - centered content, equal width */}
          <div className="text-left ml-10 md:mr-16">
            <p className="text-sm">mon — sat 8am - 6:30pm</p>
            <p className="text-sm">sun 8am - 6pm</p>
          </div>

          {/* Right - aligned to right, equal width */}
          <div className="text-left">
            <p className="text-sm font-medium">Ben Ibe Flowers</p>
            <p className="text-sm">@benibeflowers_ph</p>
            <p className="text-sm">@benibeflowersph</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
