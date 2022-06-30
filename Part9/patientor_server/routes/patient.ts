import patientsJSON from "../dump_data/patients.json";
import {Request, Response} from "express";
import { v4 as uuid } from "uuid";

enum Gender {
    female = "female",
    male = "male",
}
interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave: SickLeave;
}

interface Discharge {
    date: string;
    criteria: string;
}
interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    id: string;
    discharge: Discharge;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export type newHealthCheckEntry = Omit<HealthCheckEntry, 'id'>;
export type newHospitalEntry = Omit<HospitalEntry, 'id'>;
export type newOccupationalHealthcareEntry = Omit<
    OccupationalHealthcareEntry,
    'id'
    >;

export type newEntry =
    | newHealthCheckEntry
    | newHospitalEntry
    | newOccupationalHealthcareEntry;

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

const isNewBaseEntry = (entry: any): entry is BaseEntry => {
    if (
        !entry ||
        typeof entry.description !== 'string' ||
        typeof entry.date !== 'string' ||
        typeof entry.specialist !== 'string'
    ) {
        throw new Error('Incorrect description, date or specialist');
    }

    return entry;
};

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

export const postEntry = (req: Request, res: Response) => {
    try {
        const patientID = req.params.id;
        const newEntry: newEntry = req.body;
        if (!isNewBaseEntry(newEntry)) {
            throw new Error(`Not base entry ${newEntry}`);
        }
        const id = uuid();
        const entryWithID = { ...newEntry, id };
        [...(patientsJSON as Patient[])].forEach((patient) => {
            if (patient.id === patientID) {
                patient.entries.push(entryWithID);
                return patient;
            }
            return patient;
        });

        res.send(entryWithID)
    } catch (error) {
        res.send(error);
    }
};

