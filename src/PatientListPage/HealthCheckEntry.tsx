import React from 'react';
import {HealthCheckEntry} from '../types';
import DiagnosisComponent from './Diagnosis';
import { Icon } from 'semantic-ui-react';

const HealthCheck: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
    const healthRating = () => {
        switch (entry.healthCheckRating){
            case 0:
                return <Icon color="green" name="heart"/>;
            case 1:
                return <Icon color="yellow" name="heart"/>;
            case 2:
                return <Icon color="orange" name="heart"/>;
            case 3:
                return <Icon color="red" name="heart"/>;
            default:
                return null;
        }
    };

    return (
        <div>
            <p style={{fontWeight: 'bold'}}>{entry.date} <Icon name="user md" size="big"/> </p>
            <p style={{fontStyle: 'italic'}}>{entry.description}</p>
                {entry.diagnosisCodes && (
                  <DiagnosisComponent diagnosisCodes={entry.diagnosisCodes} />
                )}
                {healthRating()}
        </div>
    );
};

export default HealthCheck;