interface ExrciseConfig {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  workouts: Array<number>;
}

const parseExercises = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments given');
  const target = args[2];
  let workouts = args.slice(3, args.length);

  if (
    workouts.filter((w) => !isNaN(Number(w))).length === workouts.length &&
    !isNaN(Number(args[2]))
  ) {
    return {
      target: Number(args[2]),
      workouts: workouts.map((w) => Number(w)),
    };
  } else {
    throw new Error('Provided arguments were not numbers');
  }
};

const calculateExercises = (
  workouts: Array<number>,
  target: number
): ExrciseConfig => {
  const periodLength = workouts.length;
  const trainingDays = workouts.filter((w) => w > 0).length;
  const totalTraining = workouts.reduce(function (a, b) {
    return a + b;
  });
  const average = totalTraining / periodLength;
  let ratingDescription = 'quite a bit away from the target';
  let rating = 1;
  if (average >= target) {
    ratingDescription = 'excellent job, keep it going!';
    rating = 3;
  } else if (target - average < 1) {
    ratingDescription = 'not too bad but could be better';
    rating = 2;
  }

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, workouts } = parseExercises(process.argv);
  console.log(calculateExercises(workouts, target));
} catch (error: unknown) {
  let message = 'Error occured';
  if (error instanceof Error) {
    message += ': ' + error.message;
  }
  console.log(message);
}
