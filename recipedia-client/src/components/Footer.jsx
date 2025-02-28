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
                    <Link className="text-gray-300 hover:text-white transition-colors">
                      Ingredient Search
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-300 hover:text-white transition-colors">
                      AI Recipe Creator
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-300 hover:text-white transition-colors">
                      Image Recognition
                    </Link>
                  </li>
                  <li>
                    <Link className="text-gray-300 hover:text-white transition-colors">
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
                      to="/about"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/blog"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/careers"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
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
                      to="/terms"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacyPolicy"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cookiePolicy"
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
                <Link
                  target="_blank"
                  to="https://www.facebook.com/rianmallanti"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FB
                </Link>
                <Link
                  target="_blank"
                  to="https://www.instagram.com/rianfarhan/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  IG
                </Link>
                <Link
                  target="_blank"
                  to="https://linkedin.com/in/baso-rian-farhan-82bb73245"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LN
                </Link>
                <Link
                  target="_blank"
                  to="https://github.com/rianfarhan07"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GH
                </Link>
                <Link
                  target="_blank"
                  to="https://rian-portofolio.xyz"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  PF
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
