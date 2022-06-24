import express, { Response, Request } from "express";
import {calculateBmiWithArgumentsExpress} from "./bmiCalculator";
import { calculateExercisesWithArgumentsExpress } from "./exerciseCalculator";

const app = express();

app.use(express.json());

app.get("/hello", (_req: Request, res: Response) => {
    console.log('hello');
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req: Request, res: Response) => {
    const query = req.query;
    const weight = query.weight;
    const height = query.height;
    try {
        res.send({ height, weight, bmi: calculateBmiWithArgumentsExpress(height, weight)});
    } catch (error){
        res.send(error);
    }
});

app.post("/exercises", (req: Request, res: Response) => {
    try {
        res.send(
            calculateExercisesWithArgumentsExpress(req.body.target, req.body.daily_exercises)
        );
    } catch (error) {
        res.send(error);
    }
});

console.log("Running in port 3000");

app.listen(3000);
