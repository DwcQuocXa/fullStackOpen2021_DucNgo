import patientsJSON from "../dump_data/patients.json";
import {Request, Response} from "express";
import { v4 as uuid } from "uuid";

enum Gender {
    female = "female",
    male = "male",
}
export interface Entry {}

interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

const patientValidation = (object: any) : Omit<Patient, "id" | "entries"> => {
     if (!object.gender || object.gender !== "male" || object.gender !== "female") {
          throw new Error('Gender can only be female or male');
     }

    if (!object.name || typeof object.name !== 'string') {
        throw new Error("Incorrect or missing name");
    }

    if (!object.ssn || typeof object.ssn !== 'string') {
        throw new Error("Incorrect or missing ssn");
    }

    if (!object.occupation || typeof object.occupation !== 'string') {
        throw new Error("Incorrect or missing ssn");
    }

    if (!object.dateOfBirth || typeof object.dateOfBirth !== 'string') {
        throw new Error("Incorrect or missing ssn");
    }

    return object as Patient
}

export const getPatients = (_req: Request, res: Response) => {
    const patients: PublicPatient[] = [...(patientsJSON as Patient[])].map(({ id, name, dateOfBirth, gender: Gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender : Gender,
        occupation,
    }));
    res.send(patients);
}

export const postPatient = (req: Request, res: Response) => {
    try {
        const body = req.body;
        const validBody = patientValidation(body)
        const id = uuid();
        const entries: Entry[] = [];
        const patients: Patient[] = [...(patientsJSON as Patient[])]
        const newPatient = {id, entries, ...validBody}
        patients.push(newPatient)
        res.send(newPatient);
    } catch (error) {
        res.send(error);
    }
}

export const getPatientByID = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const patientById = [...(patientsJSON as Patient[])].find((patient) => patient.id === id);
        res.send(patientById)
    } catch (error) {
        res.send(error);
    }
};

