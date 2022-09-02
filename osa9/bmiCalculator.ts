interface BmiValues {
  height: number;
  weight: number;
}

const parseBmi = (args: Array<string>): BmiValues => {
  if (args.length !== 4) throw new Error('Incorrect amount of arguments given');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided arguments were not numbers');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 16) {
    return 'Underweight (severe thinness)';
  } else if (16 <= bmi && bmi < 17) {
    return 'Underweight (moderate thinness)';
  } else if (17 <= bmi && bmi < 18.5) {
    return 'Underweight (mild thinness)';
  } else if (18.5 <= bmi && bmi < 25) {
    return 'Normal (healthy weight)';
  } else if (25 <= bmi && bmi < 30) {
    return 'Overweight (pre-obese)';
  } else if (30 <= bmi && bmi < 35) {
    return 'Obese (class I)';
  } else if (35 <= bmi && bmi < 40) {
    return 'Obese (class II)';
  } else if (bmi >= 40) {
    return 'Obese (class III)';
  }
};

try {
  const { height, weight } = parseBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let message = 'Error occured';
  if (error instanceof Error) {
    message += ': ' + error.message;
  }
  console.log(message);
}
