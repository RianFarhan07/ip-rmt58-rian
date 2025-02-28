import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../helpers/url";
import { loginUser } from "../features/user/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setFormError("");

    try {
      await dispatch(loginUser(data));
      navigate("/");
    } catch (error) {
      console.error(error);
      setFormError(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  async function handleCredentialResponse(response) {
    console.log(response.credential);

    const { data } = await axios.post(`${BASE_URL}/login/google`, {
      googleToken: response.credential,
    });

    localStorage.setItem("access_token", data.access_token);
    navigate("/");
  }

  useEffect(() => {
    if (window.google?.accounts) {
      window.google.accounts.id.initialize({
        client_id:
          "862816249459-dsb6773msf2dh8lqtehmevq2cvdta1oj.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white rounded-card shadow-card w-full max-w-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to your account
          </h2>

          {formError && (
            <div className="bg-error bg-opacity-10 text-error px-4 py-3 rounded mb-4">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute inset-y-0 left-3 text-gray-400 mt-3" />
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Email is invalid",
                    },
                  })}
                  className={`w-full pl-10 pr-3 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? "border-error" : "border-gray-300"
                  }`}
                  placeholder="your@email.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-text-secondary mb-1"
              >
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute inset-y-0 left-3 text-gray-400 mt-3" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full pl-10 pr-10 py-2 border rounded-button focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.password ? "border-error" : "border-gray-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400" />
                  ) : (
                    <FiEye className="text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-button focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary hover:text-primary-hover font-medium"
              >
                Register
              </Link>
            </p>
          </div>

          <div className="w-full flex justify-center mt-4">
            <div id="buttonDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
