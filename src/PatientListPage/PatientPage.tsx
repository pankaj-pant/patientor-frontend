import React, {useState} from 'react';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {useParams} from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import { Patient, Entry } from "../types";
import { Icon } from 'semantic-ui-react';
import HospitalEntry from './HospitalEntry';
import HealthCheckEntry from './HealthCheckEntry';
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const PatientPage: React.FC = () => {
    const [, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams<{ id: string }>();

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
        </div>
    );
    }
    
};

export default PatientPage;