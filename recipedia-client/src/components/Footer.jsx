import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-bold text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="text-2xl font-bold mb-4">Recipedia</h2>
              <p className="max-w-xs text-gray-300">
                Your personal recipe assistant powered by AI and food science.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4">Features</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Ingredient Search
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      AI Recipe Creator
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Image Recognition
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Nutrition Analysis
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 Recipedia. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-4">
                {/* Social media icons would go here */}
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FB
                </Link>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  IG
                </Link>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  TW
                </Link>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  YT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
