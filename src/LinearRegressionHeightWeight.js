import React, { useState, useEffect } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

// Define the new color scheme based on the image
const colorScheme = {
  primary: "#0066cc", // Dark blue for main elements
  secondary: "#5ac8fa", // Light blue for secondary elements
  background: "#f5f5f5", // Light gray background
  text: "#1c3f60", // Dark blue text
  grid: "#e0e0e0", // Light gray for grid lines
};

const HeightWeightLinearRegression = () => {
  const [data, setData] = useState([]);
  const [slope, setSlope] = useState(0);
  const [intercept, setIntercept] = useState(0);
  const [domainX, setDomainX] = useState([0, 0]);
  const [domainY, setDomainY] = useState([0, 0]);

  useEffect(() => {
    const initialData = generateRandomUKData(100);
    setData(initialData);
    updateDomains(initialData);
  }, []);

  useEffect(() => {
    if (data.length > 1) {
      calculateLinearRegression();
    }
  }, [data]);

  const generateRandomUKData = (count) => {
    const newData = [];
    for (let i = 0; i < count; i++) {
      const isMale = Math.random() > 0.5;
      const height = isMale
        ? normalRandom(175, 7) // men's height
        : normalRandom(162, 6); // women's height
      const weight = isMale
        ? normalRandom(84, 13) // men's weight
        : normalRandom(70, 12); // women's weight
      const bmi = calculateBMI(height, weight);
      newData.push({ height, weight, bmi });
    }
    return newData;
  };

  const normalRandom = (mean, stdDev) => {
    const u = 1 - Math.random();
    const v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdDev + mean;
  };

  const calculateBMI = (height, weight) => {
    return weight / Math.pow(height / 100, 2);
  };

  const calculateLinearRegression = () => {
    const n = data.length;
    if (n < 2) return;

    let sumX = 0,
      sumY = 0,
      sumXY = 0,
      sumXX = 0;
    data.forEach((point) => {
      sumX += point.height;
      sumY += point.weight;
      sumXY += point.height * point.weight;
      sumXX += point.height * point.height;
    });

    const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    setSlope(m);
    setIntercept(b);
  };

  const updateDomains = (data) => {
    const heights = data.map((d) => d.height);
    const weights = data.map((d) => d.weight);
    const minHeight = Math.floor(Math.min(...heights));
    const maxHeight = Math.ceil(Math.max(...heights));
    const minWeight = Math.floor(Math.min(...weights));
    const maxWeight = Math.ceil(Math.max(...weights));

    const paddingX = (maxHeight - minHeight) * 0.1;
    const paddingY = (maxWeight - minWeight) * 0.1;
    setDomainX([minHeight - paddingX, maxHeight + paddingX]);
    setDomainY([minWeight - paddingY, maxWeight + paddingY]);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: colorScheme.background,
            border: `1px solid ${colorScheme.primary}`,
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ color: colorScheme.text, margin: "0 0 5px" }}>
            <strong>Height:</strong> {data.height.toFixed(2)} cm
          </p>
          <p style={{ color: colorScheme.text, margin: "0 0 5px" }}>
            <strong>Weight:</strong> {data.weight.toFixed(2)} kg
          </p>
          <p style={{ color: colorScheme.text, margin: "0" }}>
            <strong>BMI:</strong> {data.bmi.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ backgroundColor: colorScheme.background, padding: "20px" }}>
      <div className="flex flex-col md:flex-row items-start justify-center p-4 max-w-6xl mx-auto">
        <div className="w-full md:w-3/4 mb-4 md:mb-0">
          <ResponsiveContainer width="100%" height={500}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 60, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colorScheme.grid} />
              <XAxis
                type="number"
                dataKey="height"
                name="Height"
                unit="cm"
                domain={domainX}
                label={{
                  value: "Height",
                  position: "bottom",
                  offset: 35,
                  fill: colorScheme.text,
                }}
                tick={{ fill: colorScheme.text }}
              />
              <YAxis
                type="number"
                dataKey="weight"
                name="Weight"
                unit="kg"
                domain={domainY}
                label={{
                  value: "Weight",
                  angle: -90,
                  position: "insideLeft",
                  offset: -40,
                  fill: colorScheme.text,
                }}
                tick={{ fill: colorScheme.text }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{ color: colorScheme.text }}
              />
              <Scatter
                name="Individual Data Points"
                data={data}
                fill={colorScheme.secondary}
              />
              <ReferenceLine
                segment={[
                  { x: domainX[0], y: slope * domainX[0] + intercept },
                  { x: domainX[1], y: slope * domainX[1] + intercept },
                ]}
                stroke={colorScheme.primary}
                strokeWidth={3}
                name="Regression Line"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/4 md:pl-4">
          <div
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ color: colorScheme.primary, marginBottom: "10px" }}>
              Linear Regression Results:
            </h3>
            <p style={{ color: colorScheme.text, margin: "5px 0" }}>
              <strong>Slope (m):</strong> {slope.toFixed(4)}
            </p>
            <p style={{ color: colorScheme.text, margin: "5px 0" }}>
              <strong>Intercept (b):</strong> {intercept.toFixed(4)}
            </p>
            <p style={{ color: colorScheme.text, margin: "5px 0" }}>
              <strong>Equation:</strong>
            </p>
            <p style={{ color: colorScheme.primary, marginLeft: "10px" }}>
              Weight = {slope.toFixed(4)} * Height + {intercept.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeightWeightLinearRegression;
