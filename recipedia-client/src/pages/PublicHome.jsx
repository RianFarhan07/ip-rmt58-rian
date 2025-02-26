import React from "react";
import { Link } from "react-router-dom";
import {
  FiChevronRight,
  FiSearch,
  FiCpu,
  FiCamera,
  FiStar,
} from "react-icons/fi";
import profilePhoto from "../assets/foto_rian.jpg";
import Footer from "../components/Footer";

const WelcomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background-card">
      <section className="flex-grow flex flex-col md:flex-row items-center px-6 py-12 md:py-0 bg-gradient-to-br from-background to-background-dark">
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-bold mb-4">
            Your Personal Recipe Assistant
          </h1>
          <p className="text-lg text-text-secondary mb-8">
            Discover recipes based on ingredients you have, get AI-powered
            cooking suggestions, or simply snap a photo of food to get the
            recipe instantly.
          </p>
        </div>
        <div className="md:w-1/2 relative">
          <div className="relative z-10 bg-white rounded-card shadow-lg overflow-hidden max-w-md mx-auto">
            <img
              src="https://plus.unsplash.com/premium_photo-1701616947414-fd29c9cb86f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZCUyMGdyZWVufGVufDB8fDB8fHww"
              alt="Delicious Food"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-xl">
                  Discover Delicious Recipes
                </h3>
                <span className="bg-accent-light text-text-primary text-xs font-medium py-1 px-2 rounded-full">
                  Popular
                </span>
              </div>
              <p className="text-text-secondary mb-4">
                Find recipes that match your ingredients, dietary preferences,
                and cooking time.
              </p>
              <Link
                to={"/register"}
                className="w-full bg-primary-light hover:bg-primary-hover text-white font-medium py-2 rounded-button flex items-center justify-center"
              >
                Register To Explore All Features{" "}
                <FiChevronRight className="ml-1" />
              </Link>
            </div>
          </div>
          <div className="hidden md:block absolute top-1/2 right-5 transform translate-x-1/4 -translate-y-1/4 bg-accent w-24 h-24 rounded-full"></div>
          <div className="hidden md:block absolute bottom-10 left-0 transform -translate-x-1/4 bg-primary-light w-16 h-16 rounded-full opacity-70"></div>
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How Recipedia Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
                <FiSearch className="text-primary-DEFAULT text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Search by Ingredients</h3>
              <p className="text-text-secondary mb-4">
                Enter ingredients you have on hand and discover recipes you can
                make right now.
              </p>
            </div>

            <div className="bg-background rounded-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-accent-light flex items-center justify-center mb-4">
                <FiCpu className="text-primary-DEFAULT text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Recipe Generator</h3>
              <p className="text-text-secondary mb-4">
                Describe what you're craving and our AI will generate a custom
                recipe just for you.
              </p>
            </div>

            <div className="bg-background rounded-card p-6 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
                <FiCamera className="text-primary text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Image to Recipe</h3>
              <p className="text-text-secondary mb-4">
                Snap a photo of any dish and instantly get a recipe to recreate
                it at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Loved by Home Cooks</h2>

          <div className="bg-white p-8 rounded-card shadow-card mb-8">
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  className="text-accent fill-current mx-1"
                  size={24}
                />
              ))}
            </div>
            <p className="text-lg text-text-secondary italic mb-6">
              "Recipedia has completely transformed how I cook. I used to waste
              so much food, but now I can find recipes based on what I already
              have in my fridge!"
            </p>
            <div className="flex items-center justify-center">
              <img
                src={profilePhoto}
                className="w-12 h-12 rounded-full bg-gray-200 mr-3"
              ></img>
              <div className="text-left">
                <h4 className="font-bold">Rian Farhan</h4>
                <p className="text-text-secondary text-sm">
                  Professional Home Cooker
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/register"
            className="inline-block bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-button shadow-button transition duration-200"
          >
            Join Recipedia Today
          </Link>
        </div>

        <Footer />
      </section>
    </div>
  );
};

export default WelcomePage;
