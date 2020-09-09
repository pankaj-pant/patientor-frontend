import React from 'react';
import {HospitalEntry} from '../types';
import DiagnosisComponent from './Diagnosis';

const Hospital: React.FC<{entry: HospitalEntry}> = ({entry}) => {
    return (
        <div>
            <p style={{fontWeight: 'bold'}}>{entry.date} </p>
            <p style={{fontStyle: 'italic'}}>{entry.description}</p>
            {entry.diagnosisCodes && (
                <DiagnosisComponent diagnosisCodes={entry.diagnosisCodes} />
            )}
            <p>Discharged on: </p>
            {entry.discharge.date} {" - "}
            {entry.discharge.criteria}
        </div>
    );
};

export default Hospital;