  const bmiCalculator = (height: number, weight: number) => {
    const bmi = weight / Math.pow(height / 100, 2);
    let result = "";
  
    if (bmi < 18.5) {
      result = "Skinny (underweight)";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      result = "Normal (healthy weight)";
    } else if (bmi >= 25 && bmi <= 29.9) {
      result = "Fat (overweight)";
    }
  
    return `${result}`;
  };

  console.log(bmiCalculator(180, 74));

/*const calculateBmiWithArguments = () => {
  if (!process.argv[2] || !process.argv[3]) {
    throw "Both height and weight are required";
  }

  const height = parseFloat(process.argv[2]);
  const weight = parseFloat(process.argv[3]);

  if (isNaN(height) || isNaN(weight)) {
    throw "Height and weight need to be numbers";
  }

  console.log(bmiCalculator(height, weight));
};

calculateBmiWithArguments();*/

export const calculateBmiWithArgumentsExpress = (argument1: any, argument2: any) => {
  if (!argument1 || !argument2) {
    throw "Both height and weight are required";
  }

  const height = parseFloat(argument1);
  const weight = parseFloat(argument2);

  if (isNaN(height) || isNaN(weight)) {
    throw "malformatted parameters";
  }

  console.log(bmiCalculator(height, weight));
  return bmiCalculator(height, weight)
};
