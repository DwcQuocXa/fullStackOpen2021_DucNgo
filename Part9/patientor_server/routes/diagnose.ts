import diagnosesJSON from "../dump_data/diagnoses.json";
import {Request, Response} from "express";

interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export const getDiagnoses = (_req: Request, res: Response) => {
    const diagnoses: Diagnose[] = diagnosesJSON;
    res.send(diagnoses);
}

