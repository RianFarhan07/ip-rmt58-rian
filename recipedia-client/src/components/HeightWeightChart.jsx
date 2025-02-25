import React, { useState, useEffect } from "react";

const HeighWeightChart = () => {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(65);
  const [gender, setGender] = useState("male");
  const [bmi, setBmi] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");
  const [bmiColor, setBmiColor] = useState("#22c55e"); // green-500

  // Calculate BMI whenever height or weight changes
  useEffect(() => {
    const heightInMeters = height / 100;
    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(1));

    // Determine BMI category
    if (calculatedBmi < 18.5) {
      setBmiCategory("Berat Badan Kurang");
      setBmiColor("#3b82f6"); // blue-500
    } else if (calculatedBmi >= 18.5 && calculatedBmi < 25) {
      setBmiCategory("Berat Badan Normal");
      setBmiColor("#22c55e"); // green-500
    } else if (calculatedBmi >= 25 && calculatedBmi < 30) {
      setBmiCategory("Kelebihan Berat Badan");
      setBmiColor("#eab308"); // yellow-500
    } else {
      setBmiCategory("Obesitas");
      setBmiColor("#ef4444"); // red-500
    }
  }, [height, weight]);

  // Reset to default values
  const handleReset = () => {
    setHeight(170);
    setWeight(65);
  };

  // SVG Human Figure based on gender
  const HumanFigure = () => {
    // Scale factor based on height and weight
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
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "16px",
      }}
    >
      {/* Main container */}
      <div
        style={{
          border: "2px solid #e5e7eb",
          borderRadius: "12px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(to right, #3B82F6, #8B5CF6)",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "white",
              margin: 0,
            }}
          >
            Visualisasi Tinggi dan Berat Badan Interaktif
          </h1>
        </div>

        {/* Content */}
        <div style={{ padding: "24px" }}>
          {/* Gender selection */}
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div
              style={{
                display: "inline-block",
                background: "#f3f4f6",
                borderRadius: "8px",
                padding: "4px",
              }}
            >
              <button
                onClick={() => setGender("male")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  margin: "0 4px",
                  border: "none",
                  background: gender === "male" ? "#3B82F6" : "transparent",
                  color: gender === "male" ? "white" : "#4b5563",
                  fontWeight: gender === "male" ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                Pria
              </button>
              <button
                onClick={() => setGender("female")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "6px",
                  margin: "0 4px",
                  border: "none",
                  background: gender === "female" ? "#EC4899" : "transparent",
                  color: gender === "female" ? "white" : "#4b5563",
                  fontWeight: gender === "female" ? "bold" : "normal",
                  cursor: "pointer",
                }}
              >
                Wanita
              </button>
            </div>
          </div>

          {/* Main content flex container */}
          <div
            style={{
              display: "flex",
              flexDirection: window.innerWidth < 768 ? "column" : "row",
              gap: "24px",
            }}
          >
            {/* Left side - Human figure */}
            <div
              style={{
                width: window.innerWidth < 768 ? "100%" : "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                background: "#f9fafb",
              }}
            >
              <HumanFigure />
              <div style={{ marginTop: "8px", textAlign: "center" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>
                  * Gambar berubah sesuai tinggi dan berat
                </span>
              </div>
            </div>

            {/* Right side - Controls */}
            <div
              style={{
                width: window.innerWidth < 768 ? "100%" : "50%",
                display: "flex",
                flexDirection: "column",
                gap: "32px",
              }}
            >
              {/* Metrics card */}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                  background:
                    gender === "male"
                      ? "linear-gradient(to right, #EFF6FF, #EEF2FF)"
                      : "linear-gradient(to right, #FDF2F8, #F5F3FF)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      textAlign: "center",
                      padding: "8px",
                      background: "white",
                      borderRadius: "8px",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Tinggi
                    </p>
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: gender === "male" ? "#3B82F6" : "#EC4899",
                        margin: 0,
                      }}
                    >
                      {height} <span style={{ fontSize: "12px" }}>cm</span>
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "8px",
                      background: "white",
                      borderRadius: "8px",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Berat
                    </p>
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: gender === "male" ? "#8B5CF6" : "#C084FC",
                        margin: 0,
                      }}
                    >
                      {weight} <span style={{ fontSize: "12px" }}>kg</span>
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      padding: "8px",
                      background: "white",
                      borderRadius: "8px",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      BMI
                    </p>
                    <p
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: bmiColor,
                        margin: 0,
                      }}
                    >
                      {bmi}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    marginTop: "16px",
                    textAlign: "center",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: bmiColor,
                  }}
                >
                  {bmiCategory}
                </p>
              </div>

              {/* Sliders */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                }}
              >
                {/* Height slider */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>Tinggi Badan</span>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>
                        ({gender === "male" ? "140-200 cm" : "140-190 cm"})
                      </span>
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: gender === "male" ? "#3B82F6" : "#EC4899",
                      }}
                    >
                      {height} cm
                    </span>
                  </div>
                  <input
                    type="range"
                    min={140}
                    max={gender === "male" ? 200 : 190}
                    value={height}
                    onChange={(e) => setHeight(parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      margin: "16px 0",
                      accentColor: gender === "male" ? "#3B82F6" : "#EC4899",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    <span>Pendek</span>
                    <span>Rata-rata</span>
                    <span>Tinggi</span>
                  </div>
                </div>

                {/* Weight slider */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>Berat Badan</span>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>
                        ({gender === "male" ? "40-120 kg" : "35-110 kg"})
                      </span>
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: gender === "male" ? "#8B5CF6" : "#C084FC",
                      }}
                    >
                      {weight} kg
                    </span>
                  </div>
                  <input
                    type="range"
                    min={gender === "male" ? 40 : 35}
                    max={gender === "male" ? 120 : 110}
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    style={{
                      width: "100%",
                      margin: "16px 0",
                      accentColor: gender === "male" ? "#8B5CF6" : "#C084FC",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "12px",
                      color: "#6b7280",
                    }}
                  >
                    <span>Kurus</span>
                    <span>Ideal</span>
                    <span>Gemuk</span>
                  </div>
                </div>

                {/* Reset button */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "24px",
                  }}
                >
                  <button
                    onClick={handleReset}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#e5e7eb",
                      color: "#4b5563",
                      padding: "8px 16px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                    }}
                  >
                    <span>⟳</span> Reset ke Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BMI Info card */}
          <div
            style={{
              marginTop: "32px",
              padding: "16px",
              background: "#EFF6FF",
              borderRadius: "8px",
              border: "1px solid #DBEAFE",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <span
                style={{
                  marginRight: "8px",
                  color: "#3B82F6",
                  fontSize: "20px",
                }}
              >
                ℹ️
              </span>
              <div>
                <h3
                  style={{
                    fontWeight: "600",
                    color: "#1E40AF",
                    marginTop: 0,
                    marginBottom: "4px",
                  }}
                >
                  Tentang BMI (Body Mass Index)
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#4b5563",
                    marginTop: "4px",
                  }}
                >
                  BMI adalah perhitungan yang menggunakan tinggi dan berat badan
                  untuk mengestimasi jumlah lemak tubuh. BMI dapat membantu
                  menentukan apakah seseorang memiliki berat badan yang sehat.
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      padding: "8px",
                      background: "#DBEAFE",
                      borderRadius: "6px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Berat Kurang
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#3B82F6",
                        margin: "0",
                      }}
                    >
                      &lt; 18.5
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "8px",
                      background: "#DCFCE7",
                      borderRadius: "6px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Normal
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#22C55E",
                        margin: "0",
                      }}
                    >
                      18.5 - 24.9
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "8px",
                      background: "#FEF3C7",
                      borderRadius: "6px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Kelebihan Berat
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#EAB308",
                        margin: "0",
                      }}
                    >
                      25 - 29.9
                    </p>
                  </div>
                  <div
                    style={{
                      padding: "8px",
                      background: "#FEE2E2",
                      borderRadius: "6px",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        margin: "0 0 4px 0",
                      }}
                    >
                      Obesitas
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        color: "#EF4444",
                        margin: "0",
                      }}
                    >
                      ≥ 30
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeighWeightChart;
