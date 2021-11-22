import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AbsentFormContext = React.createContext();

const ReasonList = [
  { id: 1, label: 'Vaccine', description: 'Anything related to take time off regarding the vaccine get the shot. reaction to shot. etc' },
  { id: 2, label: 'Pandemic Leave', description: 'For anything COVID-19 related this will required you to be absent from work, including self quarantine.' },
  { id: 3, label: 'Late', description: 'If you need to arrive late or leave early from your shift for any reason.' },
  { id: 4, label: 'Sick', description: 'If you will be absent due to any illness or injury this in not COVID related.' },

  { id: 5, label: 'Bereavement', description: 'If you need to take time off due to a death in the family as outlined in your contract.' },
  { id: 6, label: 'FMLA - Personal', description: 'For any personal leave under the Family Medical Leave Act (FMLA)' },
  {
    id: 7,
    label: 'FMLA - Caregiver',
    description: 'For any leave as a caregiver taken under the Family Medical Leave Act (FMLA). Please verify that your FMLA eligibility has been approved before selecting this option.',
  },
  { id: 8, label: 'FMLA - Pending', description: 'If you will be absent due to any illness or injury this in not COVID related.' },
  { id: 9, label: 'Designated Events', description: 'If you will be absent due to any illness or injury this in not COVID related.' },
  { id: 10, label: 'Miscellaneous', description: 'If you will be absent due to any illness or injury this in not COVID related.' },
];

const DepartmentList = [
  { id: 1, label: 'Test dept 1' },
  { id: 2, label: 'Test dept 2' },
  { id: 3, label: 'Test dept 3' },
  { id: 4, label: 'Test dept 4' },
  { id: 5, label: 'Test dept 5' },
  { id: 6, label: 'Test dept 6' },
  { id: 7, label: 'Test dept 7' },
  { id: 8, label: 'Test dept 8' },
  { id: 9, label: 'Test dept 9' },
  { id: 10, label: 'Test dept 10' },
];

export const AbsentFormContextProvider = ({ ...props }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const stepsList = ['Please select a reason for your absence request', 'Please enter your shift details', 'Select an email for request confirmation', 'Verify your information and submit'];
  const [routeResponse, setRouteResponse] = useState({});
  const [absentReasonList, setAbsentReasonList] = useState(ReasonList);
  const [selectedAbsentReason, setSelectedAbsentReason] = useState('');
  const [departmentList, setDepartmentList] = useState(DepartmentList);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [shiftType, setShiftType] = useState('');
  const [shiftLocation, setShiftLocation] = useState('');
  const [shiftTiming, setShiftTiming] = useState([{
    shiftStartTime: '',
    shiftEndTime: '',
  }]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  // const [absenceDetails, setAbsenseDetails] = useState([
  //   {
  //     absenceStartDate: '',
  //     absenceEndDate: '',
  //     initialAbsenceStartDate: '',
  //     initialAbsenceEndDate: '',

  //     absenceStartTime: '',
  //     absenceEndTime: '',
  //     shiftStartTime: '',
  //     shiftEndTime: '',

  //     shiftLocation: '',
  //   },
  // ]);

  const [fMlaStatus, setFMlaStatus] = useState('');

  // const [hourError, setHourError] = useState(false); // error handling
  // const [minuteError, setMinuteError] = useState(false);
  const [handleError, setHandleError] = useState(false);
  const [handleLocationError, setHandleLocationError] = useState(false);
  const [timeError, setTimeError] = useState([{
    shiftStartTime: {
      hourError: false,
      minuteError: false
    },
    shiftEndTime: {
      hourError: false,
      minuteError: false
    },
    absenceStartTime: {
      hourError: false,
      minuteError: false
    },
    absenceEndTime: {
      hourError: false,
      minuteError: false
    },
  }]);

  return (
    <AbsentFormContext.Provider
      value={{
        stepsList,

        currentStep,
        setCurrentStep,

        routeResponse,
        setRouteResponse,

        absentReasonList,
        setAbsentReasonList,

        selectedAbsentReason,
        setSelectedAbsentReason,

        departmentList,
        setDepartmentList,

        selectedDepartment,
        setSelectedDepartment,

        shiftType,
        setShiftType,

        shiftLocation,
        setShiftLocation,

        shiftTiming,
        setShiftTiming,

        phoneNumber,
        setPhoneNumber,

        emailConfirm,
        setEmailConfirm,

        emailAddress,
        setEmailAddress,

        fMlaStatus,
        setFMlaStatus,

        handleError, setHandleError,
        handleLocationError, setHandleLocationError,

        timeError, setTimeError,
      }}
    >
      {props.children}
    </AbsentFormContext.Provider>
  );
};

AbsentFormContextProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
