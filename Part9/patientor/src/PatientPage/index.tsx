import React from 'react';
import axios from 'axios';

import {Patient, Entry, Diagnosis, newEntry} from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { useParams } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { setFetchedPatient, setDiagnosisList, setEntrytoPatient } from '../state';
import EntryDetails from '../components/EntryDetails';
import HealthCheckEntryForm from './HealthCheckEntryForm';
import HospitalEntryForm from './HospitalEntryForm';
import OccupationalEntryForm from './OccupationalEntryForm';

const PatientPage: React.FC = () => {
    const [{ confidentialPatientDetails, diagnosisList }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    const [patient, setPatient] = React.useState<Patient | undefined>();
    const [showForm, setShowForm] = React.useState<boolean | true>();
    const [entryType, setEntryType] = React.useState<
        string | 'HealthCheckEntry'
        >();

    const onSubmit = async (values: newEntry) => {
        console.log(values);
        try {
            if (id) {
                const { data: newEntryDetails } = await axios.post<Entry>(
                    `${apiBaseUrl}/patients/${id}/entries`,
                    values
                );
                console.log('after post', newEntryDetails);
                dispatch(setEntrytoPatient(newEntryDetails, id));
                setShowForm(false);
            }
        } catch (e) {
            console.error(e.response.data);
        }
    };

    const onCancel = (): void => {
        setShowForm(false);
    };

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

            <Button
                onClick={() => {
                    showForm ? setShowForm(false) : setShowForm(true);
                }}
            >
                Add Entry
            </Button>
            <select onChange={(e) => setEntryType(e.target.value)}>
                <option value="HealthCheckEntry">HealthCheckEntry</option>
                <option value="HospitalEntry">HospitalEntry</option>
                <option value="OccupationalHealthcareEntry">
                    OccupationalHealthcareEntry
                </option>
            </select>

            {showForm && entryType === 'HealthCheckEntry' && (
                <HealthCheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />
            )}
            {showForm && entryType === 'HospitalEntry' && (
                <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
            )}
            {showForm && entryType === 'OccupationalHealthcareEntry' && (
                <OccupationalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
            )}
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
