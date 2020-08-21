import React, {useState} from 'react';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {useParams} from 'react-router-dom';
import { useStateValue, updatePatient } from "../state";
import { Patient } from "../types";
import { Icon } from 'semantic-ui-react';

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const [patient, setPatient] = useState<Patient>();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        //axios.get<void>(`${apiBaseUrl}/ping`);  

        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                  `${apiBaseUrl}/patients/${id}`
                );
                //console.log("Inside Patient Page", patientFromApi);
                setPatient(patientFromApi);
                dispatch(updatePatient(patientFromApi));
              } catch (e) {
                console.error(e);
              }            
        };
        fetchPatient();

      }, [dispatch, id]);

/*     const renderGenderIcon = () => {
        patients[id].gender === 'male' ? <Icon disabled name='users' /> : <Icon disabled name='users' />;
    };
 */
    //console.log(Object.values(patients).find((patient: Patient) => patient.id === id));
    //console.log("Inside Patient Page", patients[id]);
    if (!patient) {
      return (
        <div><h2>Patient not found!</h2></div>
      );
    } else {
      return(
        <div>
            <h2>{patient.name} {patient.gender === 'male' ? <Icon name='mars' /> : <Icon  name='venus' />}</h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            {patient.entries.length > 0 ? <h2>entries</h2> : <h2>no entries found</h2>}
            {patient.entries.map(entry => 
              <div key={entry.id}>
                <p>{entry.date} <span style={{fontStyle: 'italic'}}>{entry.description}</span></p>
                <ul>
                  {entry.diagnosisCodes?.map(code => <li key={code}>{code}</li>)}
                </ul>
              </div>
            )}
        </div>
    );
    }
    
};

export default PatientPage;