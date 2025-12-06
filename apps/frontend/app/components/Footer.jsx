"use client";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-14 pb-8 mt-20">

      {/* TOP CONTENT */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* BRAND + TAGLINE */}
        <div className="col-span-1">
          <h2 className="text-xl font-semibold text-white tracking-tight">
            ArtisanBazaar<span className="text-yellow-400">.</span>
          </h2>

          <p className="mt-4 text-sm text-gray-400 leading-relaxed">
            Supporting Indian artisans through authentic, handmade craft.
            Thoughtfully designed pieces made with care, culture, and skill.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Products</li>
            <li className="hover:text-white cursor-pointer">About Us</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">Customer Service</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Shipping Info</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Size Guide</li>
            <li className="hover:text-white cursor-pointer">Care Instructions</li>
            <li className="hover:text-white cursor-pointer">Wholesale</li>
          </ul>
        </div>

        {/* SELLER INFO */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide">For Artisans</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Become a Seller</li>
            <li className="hover:text-white cursor-pointer">Seller Dashboard</li>
            <li className="hover:text-white cursor-pointer">Payments</li>
            <li className="hover:text-white cursor-pointer">Policies</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="w-full border-t border-gray-700 mt-12 pt-5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-gray-300">ArtisanBazaar</span>.  
            All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <button className="hover:text-white cursor-pointer">Privacy Policy</button>
            <button className="hover:text-white cursor-pointer">Terms of Service</button>
            <button className="hover:text-white cursor-pointer">Cookie Policy</button>
          </div>

        </div>
      </div>

    </footer>
  );
}
