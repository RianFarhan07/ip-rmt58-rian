import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiUser, FiSave, FiAlertCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { fetchProfile, updateProfile } from "../features/userSlice";
import HeightWeightVisualization from "../components/HeightWeightChart";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [gender, setGender] = useState("male");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.state?.isNewUser) {
      setSuccessMessage(
        location.state.message || "Welcome! Please complete your profile."
      );
    }
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      age: "",
      activity_level: "low",
      diet: "no_restriction",
      allergies: [],
    },
  });

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      navigate("/login", {
        state: { message: "Please log in to access your profile" },
      });
      return;
    }

    try {
      dispatch(fetchProfile()).then((profileData) => {
        if (profileData) {
          // Set the visualization component states
          setHeight(profileData.height || 170);
          setWeight(profileData.weight || 65);
          setGender(profileData.gender || "male");

          // Set remaining form fields
          setValue("age", profileData.age || "");
          setValue("activity_level", profileData.activity_level || "low");
          setValue("diet", profileData.diet || "no_restriction");

          const allergiesArray = profileData.allergies || [];
          setValue("allergies", allergiesArray);
        }
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [dispatch, navigate, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setFormError("");
    setSuccessMessage("");

    try {
      const profileData = {
        ...data,
        height: parseFloat(height),
        weight: parseFloat(weight),
        gender: gender,
        age: parseInt(data.age),
        diet: data.diet === "no_restriction" ? null : data.diet,
      };

      await dispatch(updateProfile(profileData));

      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);

      if (error.response?.data?.message) {
        setFormError(error.response.data.message);
      } else {
        setFormError("Failed to update profile. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const activityOptions = [
    { value: "low", label: "Low (little or no exercise)" },
    { value: "light", label: "Light (light exercise 1-3 days/week)" },
    { value: "moderate", label: "Moderate (moderate exercise 3-5 days/week)" },
    { value: "high", label: "High (hard exercise 6-7 days/week)" },
    {
      value: "very_high",
      label:
        "Very High (very hard exercise, physical job or training twice a day)",
    },
  ];

  const dietOptions = [
    { value: "no_restriction", label: "No Restrictions" },
    { value: "gluten free", label: "Gluten Free" },
    { value: "ketogenic", label: "Ketogenic" },
    { value: "lacto-vegetarian", label: "Lacto Vegetarian" },
    { value: "ovo-vegetarian", label: "Ovo Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "pescetarian", label: "Pescetarian" },
    { value: "paleo", label: "Paleo" },
    { value: "primal", label: "Primal" },
    { value: "low fodmap", label: "Low Fodmap" },
    { value: "whole30", label: "Whole30" },
  ];

  const commonAllergies = [
    "dairy",
    "egg",
    "gluten",
    "grain",
    "peanut",
    "seafood",
    "sesame",
    "shellfish",
    "soy",
    "sulfite",
    "tree nut",
    "wheat",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-card shadow-card max-w-2xl mx-auto p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-20 w-20 bg-primary text-white rounded-full flex items-center justify-center">
              <FiUser className="h-10 w-10" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">
            Complete Your Profile
          </h1>
          <p className="text-text-secondary text-center mb-6">
            This information helps us personalize recipe suggestions to your
            needs
          </p>

          <div className="mb-8">
            <h2 className="text-lg font-medium text-text-primary mb-4">
              Body Metrics
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <HeightWeightVisualization
                height={height}
                weight={weight}
                gender={gender}
                setHeight={setHeight}
                setWeight={setWeight}
                setGender={setGender}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">
                Age
              </label>
              <input
                type="number"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 1, message: "Age must be at least 1" },
                  max: { value: 120, message: "Age must be less than 120" },
                })}
                className={`w-full px-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.age ? "border-error" : "border-gray-300"
                }`}
                placeholder="Your age"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-error">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Activity Level
              </label>
              <select
                {...register("activity_level", {
                  required: "Activity level is required",
                })}
                className={`w-full px-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.activity_level ? "border-error" : "border-gray-300"
                }`}
              >
                {activityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.activity_level && (
                <p className="mt-1 text-sm text-error">
                  {errors.activity_level.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Diet Preference
              </label>
              <select
                {...register("diet")}
                className="w-full px-3 py-2 border rounded-button border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {dietOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Food Allergies
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {commonAllergies.map((allergy) => (
                  <label key={allergy} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={allergy}
                      {...register("allergies")}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{allergy}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Your information helps us provide better recipe
                    recommendations based on your nutritional needs. We take
                    your privacy seriously and will never share your data.
                  </p>
                </div>
              </div>
            </div>

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                {successMessage}
              </div>
            )}

            {formError && (
              <div className="bg-error bg-opacity-10 text-error px-4 py-3 rounded mb-6">
                {formError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-3 px-4 rounded-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving Profile...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save Profile
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
