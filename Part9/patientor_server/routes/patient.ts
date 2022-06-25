import patientsJSON from "../dump_data/patients.json";
import {Request, Response} from "express";

interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: string;
    occupation: string;
}

export const getPatients = (_req: Request, res: Response) => {
    const patients: Patient[] = patientsJSON.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
    res.send(patients);
}

