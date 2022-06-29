import express from "express";
import cors from "cors";
import {getDiagnoses} from "./routes/diagnose";
import {getPatientByID, getPatients, postPatient} from "./routes/patient";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
    res.send("pong");
});

app.get("/api/diagnoses", getDiagnoses);

app.get("/api/patients", getPatients);
app.post("/api/patients", postPatient);
app.get("/api/patients/:id", getPatientByID);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
