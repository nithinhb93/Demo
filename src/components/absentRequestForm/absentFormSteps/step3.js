/* eslint-disable */
import React, { useContext, useState } from 'react';
import {
  Grid, Typography, FormControl, RadioGroup, FormControlLabel, Radio, TextField,
} from '@material-ui/core';
import { AbsentFormContext } from '../absentFormContext/absentContext';
import PhoneNumberInput from '../../../elements/phoneNumberInput';

const AbsentFormStep3 = () => {
  const {
    phoneNumber, setPhoneNumber, routeResponse, emailConfirm,
    setEmailConfirm, emailAddress, setEmailAddress,mailAddress, setMailAddress,
  } = useContext(AbsentFormContext);
  const theme = JSON.parse(window.localStorage.getItem('theme'));
  const filterEmailId = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  //const [mailAddress, setMailAddress] = useState(emailAddress);
  const [mailError, setMailError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const handleResetEmail = () => {
    setMailError(false);
    setEmailError(false);
  //  setMailAddress('');
    setEmailAddress('');
  };

  const emailTextField = (label, mailValue,
    onChangeEmail, errorValue, handleError, confirmation, disable) => (
    <TextField
      value={mailValue}
     onChange={(e) => onChangeEmail(e.target.value.trimLeft())}
      type="email"
      label={label}
      fullWidth
      variant="outlined"
      required
      disabled={disable}
      onClose={() => {
        setTimeout(() => {
          document.activeElement.blur();
        }, 0);
      }}
      onFocus={() => handleError(false)}
      onBlur={() => (mailValue?.match(filterEmailId) === null || !mailValue ? handleError(true) : '')}
      error={errorValue}
      style={{width:'220px'}}
      helperText={errorValue && mailValue ? 'Please enter a valid email address' : errorValue && !mailValue ? 'Please enter email address' : confirmation ? 'Email Address is not matching' : ''}
    />
  );

  return (
    <Grid md={10} xs={12} container spacing={2} style={{ padding: '1rem .5rem 2rem .5rem' }}>
      <Grid item md={3} xs={12}>
        <PhoneNumberInput
          phcode={phoneNumber?.split('-')?.[0]}
          phNumber={phoneNumber}
          onChange={(value)=>{setPhoneNumber(value);}}
        />
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography color="preSecondary" style={{ color: theme?.palette?.preSecondary?.main, font: '400 16px Roboto,Helvetica Neue,sans-serif' }}>
          Once you submit your request, a confirmation email will be sent to
          &nbsp;&nbsp;
          <b style={{ color: theme?.palette?.primary?.main }}>{routeResponse?.userProfile?.email || ''}</b>
        </Typography>
      </Grid>
      <Grid item md={12} xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Typography color="preSecondary" style={{ marginRight: '10px', color: theme?.palette?.preSecondary?.main, font: '400 16px Roboto,Helvetica Neue,sans-serif' }}>
          Would you also like to have your confirmation sent to your personal email ?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup row aria-label="shift" name="row-radio-buttons-group" value={emailConfirm} onChange={(e) => { setEmailConfirm(e.target.value); handleResetEmail(); }}>
            <FormControlLabel color="primary" value="yes" control={<Radio color="primary" />} label={<Typography color="primary" style={{ fontWeight: 'bold' }}>Yes</Typography>} />
            <FormControlLabel color="primary" value="no" control={<Radio color="primary" />} label={<Typography color="primary" style={{ fontWeight: 'bold' }}>No</Typography>} />
          </RadioGroup>
        </FormControl>
      </Grid>
      {emailConfirm === 'yes' ? (
        <>
          <Grid item md={2} xs={12}>
            {emailTextField('Email', mailAddress, setMailAddress, mailError, setMailError)}
          </Grid>
          <Grid item md={10} />
          <Grid item md={2} xs={12}>
            {emailTextField('Please re-enter email', emailAddress, setEmailAddress, emailError, setEmailError, (mailAddress && mailAddress !== emailAddress && emailAddress), !mailAddress)}
          </Grid>
        </>
      ) : null}
    </Grid>
  );
};

export default AbsentFormStep3;
