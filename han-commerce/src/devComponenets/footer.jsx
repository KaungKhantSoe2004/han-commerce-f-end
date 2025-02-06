import { FiFacebook, FiInstagram, FiTwitch, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-24">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500">HAN-COMMERCE</h2>
            <p className="text-gray-400">
              Your ultimate destination for premium sportswear and fitness
              equipment.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="hover:text-red-500 transition-colors text-blue-900"
              >
                <FiInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition-colors text-blue-900"
              >
                <FiFacebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="hover:text-red-500 transition-colors text-blue-900"
              >
                <FiTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors "
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Sportswear
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Fitness Equipment
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Accessories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  Nutrition
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  New Arrivals
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">123 Fitness Street</span>
                <span className="block">New York, NY 10001</span>
              </li>
              <li className="text-gray-400">
                <span className="block">Email: info@han-commerce.com</span>
                <span className="block">Phone: (123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} HAN-COMMERCE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
