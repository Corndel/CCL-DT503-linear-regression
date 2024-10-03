# Height-Weight Linear Regression Visualization

This React component provides a interactive visualization of the relationship between height and weight using linear regression. It generates random data based on UK averages, calculates BMI, performs linear regression, and displays the results in a scatter plot with a regression line.

## Features

- Random data generation based on UK height and weight averages
- BMI calculation for each data point
- Linear regression calculation
- Interactive scatter plot visualization
- Regression line display
- Detailed tooltips for each data point
- Regression results panel (slope, intercept, and equation)
- Responsive design
- Customizable color scheme

## Installation

1. Ensure you have React and npm (Node Package Manager) installed in your project.

2. Install the required dependencies:

```bash
npm install recharts
```

3. Copy the `HeightWeightLinearRegression.js` file into your project's components directory.

## Usage

1. Import the component in your React application:

```jsx
import HeightWeightLinearRegression from "./path/to/HeightWeightLinearRegression";
```

2. Use the component in your JSX:

```jsx
function App() {
  return (
    <div className="App">
      <HeightWeightLinearRegression />
    </div>
  );
}
```

## Customization

You can customize the color scheme by modifying the `colorScheme` object at the top of the `HeightWeightLinearRegression.js` file:

```javascript
const colorScheme = {
  primary: "#0066cc",
  secondary: "#5ac8fa",
  background: "#f5f5f5",
  text: "#1c3f60",
  grid: "#e0e0e0",
};
```

## Component Structure

- `generateRandomUKData`: Generates random height and weight data
- `normalRandom`: Utility function for generating normally distributed random numbers
- `calculateBMI`: Calculates BMI for given height and weight
- `calculateLinearRegression`: Performs linear regression on the data
- `updateDomains`: Updates the domains for the X and Y axes
- `CustomTooltip`: Renders a custom tooltip for data points

## Dependencies

- React
- recharts

## Notes

- The component uses UK averages for height and weight. Adjust the `normalRandom` parameters in `generateRandomUKData` if you need different distributions.
- The linear regression is performed using the least squares method.
- The component is responsive and will adjust to the width of its container.

## Contributing

Contributions to improve the component are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Gareth Day - gareth.day@corndel.com
