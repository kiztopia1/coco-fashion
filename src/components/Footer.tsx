import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* First column */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-bold">About Us</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* Second column */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-bold">Useful Links</h2>
          <ul className="text-sm">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Third column */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-lg font-bold">Connect With Us</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-xl hover:text-blue-500">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-xl hover:text-blue-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-xl hover:text-blue-500">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
