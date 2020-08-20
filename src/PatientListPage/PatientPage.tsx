import React from 'react';
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {useParams} from 'react-router-dom';
import { useStateValue } from "../state";
import { Patient } from "../types";
import { Icon } from 'semantic-ui-react';

const PatientPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        //axios.get<void>(`${apiBaseUrl}/ping`);  

        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                  `${apiBaseUrl}/patients/${id}`
                );
                //console.log("Inside Patient Page", patientFromApi);
                dispatch({ type: "UPDATE_PATIENT", payload: patientFromApi });
              } catch (e) {
                console.error(e);
              }            
        };
        fetchPatient();

      }, [id]);

/*     const renderGenderIcon = () => {
        patients[id].gender === 'male' ? <Icon disabled name='users' /> : <Icon disabled name='users' />;
    };
 */
    //console.log(Object.values(patients).find((patient: Patient) => patient.id === id));
    //console.log("Inside Patient Page", patients[id]);
    return(
        <div>
            <h2>{patients[id].name} {patients[id].gender === 'male' ? <Icon name='mars' /> : <Icon  name='venus' />}</h2>
            <p>ssn: {patients[id].ssn}</p>
            <p>occupation: {patients[id].occupation}</p>
        </div>
    );
};

export default PatientPage;