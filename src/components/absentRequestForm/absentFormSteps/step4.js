import React, { useContext } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AbsentFormContext } from '../absentFormContext/absentContext';

const AbsentFormStep4 = () => {
  const {
    selectedAbsentReason, selectedDepartment, shiftLocation,
    shiftTiming, phoneNumber, routeResponse, emailAddress,
  } = useContext(AbsentFormContext);
  const theme = JSON.parse(window.localStorage.getItem('theme'));
  return (
    <Grid container spacing={2} style={{ padding: '.5rem 0rem 2rem 0rem' }}>
      <Grid item md={12} xs={12}>
        <Typography style={{ color: theme?.palette?.preSecondary?.main, font: "normal normal 13px 'Roboto', sans-serif", margin: '.9rem 0px' }}>
          Please review your information below.
          If you need to make any changes to your request.
          Use the &quot;Back&quot; button to return to the form fields.
          If everything looks good, click &quot;Submit&quot; button
        </Typography>
        <Typography style={{ color: theme?.palette?.preSecondary?.main, font: "normal normal 13px 'Roboto', sans-serif", margin: '.9rem 0px' }}>
          Request Reason:
          {' '}
          <b style={{ color: theme?.palette?.prePrimary?.main }}>{selectedAbsentReason}</b>
        </Typography>
        {routeResponse?.daysType === 'multiple' ? (
          <Typography style={{ color: theme?.palette?.preSecondary?.main, font: "normal normal 13px 'Roboto', sans-serif", margin: '.9rem 0px' }}>
            Date Request and Shift Times
            &nbsp; : &nbsp;
            <b style={{ color: theme?.palette?.prePrimary?.main }}>{routeResponse?.startDate ? new Date(routeResponse?.startDate).toDateString() : ''}</b>
          &nbsp; : &nbsp;
            <b style={{ color: theme?.palette?.prePrimary?.main }}>{routeResponse?.endDate ? new Date(routeResponse?.endDate).toDateString() : ''}</b>
          &nbsp; : &nbsp;
            <b style={{ color: theme?.palette?.prePrimary?.main }}>{`${shiftTiming?.startTime} : ${shiftTiming?.endTime}`}</b>
          </Typography>
        ) : (
          <Typography style={{ color: theme?.palette?.preSecondary?.main, font: "normal normal 13px 'Roboto', sans-serif", margin: '.9rem 0px' }}>
            Date Request and Shift Times
            &nbsp; : &nbsp;
            <b style={{ color: theme?.palette?.prePrimary?.main }}>{routeResponse?.startDate ? new Date(routeResponse?.startDate).toDateString() : ''}</b>
            &nbsp; : &nbsp;
            <b style={{ color: theme?.palette?.prePrimary?.main }}>{`${shiftTiming?.startTime} : ${shiftTiming?.endTime}`}</b>
          </Typography>
        )}

        <Typography style={{ color: theme?.palette?.preSecondary?.main, font: "normal normal 13px 'Roboto', sans-serif", margin: '.9rem 0px' }}>
          Department and Location
          &nbsp; : &nbsp;
          <b style={{ color: theme?.palette?.prePrimary?.main }}>{selectedDepartment}</b>
          &nbsp; : &nbsp;
          <b style={{ color: theme?.palette?.prePrimary?.main }}>{shiftLocation}</b>
        </Typography>
        <Typography style={{ color: theme?.palette?.preSecondary?.main, font: "normal normal 13px 'Roboto', sans-serif", margin: '.9rem 0px' }}>
          Email
          &nbsp; : &nbsp;
          <b style={{ color: theme?.palette?.prePrimary?.main }}>{emailAddress || routeResponse?.userProfile?.email || ''}</b>
        </Typography>
        <Typography style={{ color: theme?.palette?.preSecondary?.main, font: "normal normal 13px 'Roboto', sans-serif", margin: '.9rem 0px' }}>
          Contact Number
          &nbsp; : &nbsp;
          <b style={{ color: theme?.palette?.prePrimary?.main }}>{phoneNumber}</b>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AbsentFormStep4;
