interface Result {
    days: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const ratings = [
    "you're slowing down the process. Try harder next week",
    "not too bad but could be better",
    "looks great. Keep it up",
];

const exercisesCalculator = (exercises: number[], target: number): Result => {
    const days = exercises.length;
    const trainingDays = exercises.filter(exercise => exercise > 0).length

    const totalHours = exercises.reduce((total, hours) => total + hours, 0);

    const average = totalHours / days;
    const rating = (average >= target + 0.5) ? 3 : (average >= target) ? 2 : 1;

    return {
        days,
        trainingDays,
        target,
        success: average >= target,
        average,
        rating,
        ratingDescription: ratings[rating - 1],
    };
};

console.log(exercisesCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));

/*const exercisesCalculatorWithArguments = () => {
    const [, , target, ...arguments] = process.argv;

    if (!target || arguments.length === 0) {
        throw "Both target and exercises are required";
    }

    const exercises = arguments.map((argument) => parseFloat(argument));

    if (isNaN(parseFloat(target)) || exercises.some((exercise) => isNaN(exercise))) {
        throw "Exercises and target must be numbers";
    }

    console.log(exercisesCalculator(exercises, parseFloat(target)));
};

exercisesCalculatorWithArguments();*/

export const calculateExercisesWithArgumentsExpress = (target: any, inputExercises: any[]) => {
    if (!target || inputExercises.length === 0) {
        throw "parameters missing";
    }

    const exercises = inputExercises.map((inputExercise) => parseFloat(inputExercise));

    if (isNaN(parseFloat(target)) || exercises.some((exercise) => isNaN(exercise))) {
        throw "malformatted parameters";
    }

    console.log(exercisesCalculator(exercises, parseFloat(target)));
    return exercisesCalculator(exercises, target);
};
