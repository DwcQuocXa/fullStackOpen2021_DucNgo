import React from 'react';
import axios from 'axios';

import { Patient, Entry, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { setFetchedPatient, setDiagnosisList } from '../state';
import EntryDetails from '../components/EntryDetails';

const PatientPage: React.FC = () => {
    const [{ confidentialPatientDetails, diagnosisList }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | undefined>();
    React.useEffect(() => {
            async function getPatient() {
                try {
                    if (id) {
                        const { data: patient } = await axios.get<Patient>(
                            `${apiBaseUrl}/patients/${id}`
                        );
                        dispatch(setFetchedPatient(patient));
                        setPatient(patient);
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            async function fetchDiagnosisList() {
                try {
                    const { data: diagnosisList } = await axios.get<Diagnosis[]>(
                        `${apiBaseUrl}/diagnoses`
                    );
                    dispatch(setDiagnosisList(diagnosisList));
                } catch (error) {
                    console.log(error);
                }
            }

            if (id) {
                if (confidentialPatientDetails[id]) {
                    setPatient(confidentialPatientDetails[id]);
                } else {
                    void getPatient();
                }
            }

            if (Object.values(diagnosisList).length === 0) {
                void fetchDiagnosisList();
            }
        }, [dispatch, id, confidentialPatientDetails, diagnosisList]);


    if (!patient) return <div>Loading...</div>;

    return (
        <div>
            <h1>{patient.name}</h1>
            <div>
                <b>SSN:</b> {patient.ssn}
            </div>
            <div>
                <b>Occupation:</b> {patient.occupation}
            </div>
            {patient.entries.length > 0 && (
                <div>
                    <h2>Entries</h2>
                    {patient.entries.map((entry: Entry) => {
                        return (
                            /*<div key={entry.id}>
                                <p>
                                    {entry.date} {entry.description}
                                </p>
                                <ul>
                                    {entry.diagnosisCodes &&
                                        entry.diagnosisCodes.map(
                                            (diagonsisCode: Diagnosis['code']) => (
                                                <li key={diagonsisCode}>
                                                    {diagonsisCode}{' '}
                                                    {diagnosisList[diagonsisCode] &&
                                                        diagnosisList[diagonsisCode].name}
                                                </li>
                                            )
                                        )}
                                </ul>
                            </div>*/
                            <div
                                style={{
                                border: 'solid 2px',
                                marginTop: 10,
                                marginBottom: 10,
                                padding: 5,
                                boxShadow: '3px 5px grey'
                            }}
                                key={entry.id}
                            >
                                <EntryDetails entry={entry}/>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PatientPage;
