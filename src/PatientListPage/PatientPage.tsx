import React, {useState} from 'react';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {useParams} from 'react-router-dom';
import { useStateValue, updatePatient, addPatient } from "../state";
import { Patient, Entry } from "../types";
import { Icon, Button } from 'semantic-ui-react';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage: React.FC = () => {
    const [, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    React.useEffect(() => {
        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                  `${apiBaseUrl}/patients/${id}`
                );
                setPatient(patientFromApi);
                dispatch(updatePatient(patientFromApi));
              } catch (e) {
                console.error(e);
              }            
        };
        fetchPatient();
      }, [dispatch, id]);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
      try {
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
        setPatient(newPatient);
        dispatch(updatePatient(newPatient));
        closeModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };

    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };
    
    const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
      switch (entry.type){
        case "Hospital":
          return <HospitalEntry entry={entry} />;
        case "HealthCheck":
          return <HealthCheckEntry entry={entry} />;
        case "OccupationalHealthcare":
          return <OccupationalHealthcareEntry entry={entry} />;
        default:
          return assertNever(entry);
      }
    };



    if (!patient) {
      return (
        <div><h2>Patient not found!</h2></div>
      );
    } else {
      return(
        <div>
            <h2>{patient.name} {patient.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' />}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            {patient.entries.length > 0 ? <h2>entries</h2> : <h2>no entries found</h2>}
            {patient.entries.map(entry => 
              <div style={{border: "1px solid lightgrey", margin: "10px", padding: "10px"}}key={entry.id}>
                <EntryDetails entry={entry}/>  
              </div>
            )}
            <AddEntryModal
              modalOpen={modalOpen}
              onSubmit={submitNewEntry}
              error={error}
              onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    );
    }
    
};

export default PatientPage;