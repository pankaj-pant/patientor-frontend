import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      //console.log("Inside Update Patient", state.patients);
      const updatedPatientsArray = Object.values(state.patients).map(patient => patient.id === action.payload.id ? action.payload : patient);
      //console.log("Updated Patients", updatedPatients);
      const patientsObj: {[id: string]: Patient} = {};
      for (let i = 0; i < updatedPatientsArray.length; i++){
        patientsObj[updatedPatientsArray[i].id] = updatedPatientsArray[i];
      }
      //console.log("patientsObj", patientsObj);
      return {
        ...state,
        patients: patientsObj
      };      
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient = (newPatient: Patient): Action => {
  return {
    type: "ADD_PATIENT", 
    payload: newPatient
  };
};

export const updatePatient = (patientFromApi: Patient): Action => {
  return {
    type: "UPDATE_PATIENT", payload: patientFromApi
  };
};