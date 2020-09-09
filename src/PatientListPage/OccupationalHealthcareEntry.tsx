import React from 'react';
import {OccupationalHealthcareEntry} from '../types';
import DiagnosisComponent from './Diagnosis';
import { Icon } from 'semantic-ui-react';

const OccupationalHealthcare: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {

    return (
        <div>
            <p style={{fontWeight: 'bold'}}>{entry.date} <Icon name="stethoscope" size="big"/> {entry.employerName}</p>
            <p style={{fontStyle: 'italic'}}>{entry.description}</p>
                {entry.diagnosisCodes && (
                  <DiagnosisComponent diagnosisCodes={entry.diagnosisCodes} />
                )}
        </div>
    );
};

export default OccupationalHealthcare;