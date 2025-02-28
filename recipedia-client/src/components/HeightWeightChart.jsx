import { useEffect, useState } from "react";

const HeightWeightVisualization = ({
  height,
  weight,
  gender,
  setHeight,
  setWeight,
  setGender,
}) => {
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");
  const [bmiColor, setBmiColor] = useState("#22c55e");

  useEffect(() => {
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(1));

    if (calculatedBmi < 18.5) {
      setBmiCategory("Underweight");
      setBmiColor("#3b82f6");
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setBmiCategory("Normal Weight");
      setBmiColor("#22c55e");
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setBmiCategory("Overweight");
      setBmiColor("#eab308");
    } else {
      setBmiCategory("Obesity");
      setBmiColor("#ef4444");
    }
  }, [height, weight]);

  const HumanFigure = () => {
    const widthScale = 1 + (weight - 65) / 100;

    if (gender === "male") {
      return (
        <svg
          viewBox="0 0 200 500"
          style={{
            height: `${Math.min(400, height * 1.5)}px`,
            maxWidth: "100%",
          }}
        >
          {/* Head */}
          <circle
            cx="100"
            cy="60"
            r="40"
            fill="#FFD1B0"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Face */}
          <circle cx="85" cy="50" r="5" fill="#333" /> {/* Left eye */}
          <circle cx="115" cy="50" r="5" fill="#333" /> {/* Right eye */}
          <path
            d="M90 75 Q100 85 110 75"
            stroke="#333"
            strokeWidth="2"
            fill="none"
          />{" "}
          {/* Smile */}
          {/* Neck */}
          <rect x="90" y="100" width="20" height="20" fill="#FFD1B0" />
          {/* Body - scaled by weight */}
          <path
            d={`M${100 - 50 * widthScale} 130 
                L${100 - 40 * widthScale} 270 
                L${100 + 40 * widthScale} 270 
                L${100 + 50 * widthScale} 130 Z`}
            fill="#3B82F6"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Arms */}
          <path
            d={`M${100 - 50 * widthScale} 140 
                L${100 - 70 * widthScale} 200 
                L${100 - 65 * widthScale} 205 
                L${100 - 45 * widthScale} 150 Z`}
            fill="#FFD1B0"
            stroke="#000"
            strokeWidth="1"
          />
          <path
            d={`M${100 + 50 * widthScale} 140 
                L${100 + 70 * widthScale} 200 
                L${100 + 65 * widthScale} 205 
                L${100 + 45 * widthScale} 150 Z`}
            fill="#FFD1B0"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Legs */}
          <path
            d={`M${100 - 40 * widthScale} 270 
                L${100 - 45 * widthScale} 400 
                L${100 - 25 * widthScale} 400 
                L${100 - 20 * widthScale} 270 Z`}
            fill="#1F2937"
            stroke="#000"
            strokeWidth="1"
          />
          <path
            d={`M${100 + 20 * widthScale} 270 
                L${100 + 25 * widthScale} 400 
                L${100 + 45 * widthScale} 400 
                L${100 + 40 * widthScale} 270 Z`}
            fill="#1F2937"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Feet */}
          <ellipse
            cx={`${100 - 35 * widthScale}`}
            cy="410"
            rx="15"
            ry="10"
            fill="#111"
          />
          <ellipse
            cx={`${100 + 35 * widthScale}`}
            cy="410"
            rx="15"
            ry="10"
            fill="#111"
          />
        </svg>
      );
    } else {
      return (
        <svg
          viewBox="0 0 200 500"
          style={{
            height: `${Math.min(400, height * 1.5)}px`,
            maxWidth: "100%",
          }}
        >
          {/* Head */}
          <circle
            cx="100"
            cy="60"
            r="40"
            fill="#FFD1B0"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Hair */}
          <path
            d="M60 60 Q100 0 140 60"
            fill="#874B19"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Face */}
          <circle cx="85" cy="50" r="5" fill="#333" /> {/* Left eye */}
          <circle cx="115" cy="50" r="5" fill="#333" /> {/* Right eye */}
          <path
            d="M90 75 Q100 85 110 75"
            stroke="#333"
            strokeWidth="2"
            fill="none"
          />{" "}
          {/* Smile */}
          {/* Neck */}
          <rect x="90" y="100" width="20" height="20" fill="#FFD1B0" />
          {/* Body - with dress shape */}
          <path
            d={`M${100 - 45 * widthScale} 130 
                L${100 - 60 * widthScale} 270 
                L${100 + 60 * widthScale} 270 
                L${100 + 45 * widthScale} 130 Z`}
            fill="#EC4899"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Arms */}
          <path
            d={`M${100 - 45 * widthScale} 140 
                L${100 - 65 * widthScale} 200 
                L${100 - 60 * widthScale} 205 
                L${100 - 40 * widthScale} 150 Z`}
            fill="#FFD1B0"
            stroke="#000"
            strokeWidth="1"
          />
          <path
            d={`M${100 + 45 * widthScale} 140 
                L${100 + 65 * widthScale} 200 
                L${100 + 60 * widthScale} 205 
                L${100 + 40 * widthScale} 150 Z`}
            fill="#FFD1B0"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Legs */}
          <path
            d={`M${100 - 30 * widthScale} 270 
                L${100 - 35 * widthScale} 400 
                L${100 - 15 * widthScale} 400 
                L${100 - 10 * widthScale} 270 Z`}
            fill="#FFD1B0"
            stroke="#000"
            strokeWidth="1"
          />
          <path
            d={`M${100 + 10 * widthScale} 270 
                L${100 + 15 * widthScale} 400 
                L${100 + 35 * widthScale} 400 
                L${100 + 30 * widthScale} 270 Z`}
            fill="#FFD1B0"
            stroke="#000"
            strokeWidth="1"
          />
          {/* Feet */}
          <ellipse
            cx={`${100 - 25 * widthScale}`}
            cy="410"
            rx="12"
            ry="8"
            fill="#FF69B4"
          />
          <ellipse
            cx={`${100 + 25 * widthScale}`}
            cy="410"
            rx="12"
            ry="8"
            fill="#FF69B4"
          />
        </svg>
      );
    }
  };

  return (
    <div className="font-sans max-w-4xl mx-auto">
      <div className="border-2 border-gray-200 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="inline-block bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setGender("male")}
                className={`px-4 py-2 rounded-md mx-1 border-none ${
                  gender === "male"
                    ? "bg-blue-500 text-white font-bold"
                    : "bg-transparent text-gray-600"
                } cursor-pointer`}
              >
                Male
              </button>
              <button
                onClick={() => setGender("female")}
                className={`px-4 py-2 rounded-md mx-1 border-none ${
                  gender === "female"
                    ? "bg-pink-500 text-white font-bold"
                    : "bg-transparent text-gray-600"
                } cursor-pointer`}
              >
                Female
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 p-4 flex flex-col items-center">
              <div className="h-full flex flex-col items-center justify-center">
                <span className="mb-2 text-xs font-semibold text-gray-700">
                  Height ({height} cm)
                </span>
                <div className="relative h-96 flex items-center">
                  <input
                    type="range"
                    min={140}
                    max={200}
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    className="w-full h-2 appearance-none bg-gray-200 rounded-full outline-none"
                    style={{
                      accentColor: gender === "male" ? "#3B82F6" : "#EC4899",
                      transform: "rotate(270deg) ",
                      transformOrigin: "center",
                      width: "16rem",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-4 flex justify-center">
              <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 flex flex-col items-center justify-center">
                <HumanFigure />
                <div className="text-center mt-2">
                  <span className="text-sm text-gray-500">
                    BMI: <span style={{ color: bmiColor }}>{bmi}</span> -{" "}
                    {bmiCategory}
                  </span>
                </div>
              </div>
            </div>

            <div className="md:w-1/4 p-4 flex flex-col items-center justify-center">
              <div className="rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50 w-full">
                <div className="text-center p-2 bg-white rounded-md shadow-sm mb-3">
                  <p className="text-sm font-medium text-gray-600 m-0 mb-1">
                    Height
                  </p>
                  <p
                    className="text-xl font-bold m-0"
                    style={{ color: gender === "male" ? "#3B82F6" : "#EC4899" }}
                  >
                    {height} <span className="text-xs">cm</span>
                  </p>
                </div>

                <div className="text-center p-2 bg-white rounded-md shadow-sm">
                  <p className="text-sm font-medium text-gray-600 m-0 mb-1">
                    Weight
                  </p>
                  <p
                    className="text-xl font-bold m-0"
                    style={{ color: gender === "male" ? "#8B5CF6" : "#C084FC" }}
                  >
                    {weight} <span className="text-xs">kg</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 p-4">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-gray-700">Weight</span>
              <span
                className="font-bold"
                style={{ color: gender === "male" ? "#8B5CF6" : "#C084FC" }}
              >
                {weight} kg
              </span>
            </div>
            <input
              type="range"
              min={35}
              max={120}
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              className="w-full"
              style={{
                accentColor: gender === "male" ? "#8B5CF6" : "#C084FC",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeightWeightVisualization;
