/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import {
  Grid, InputLabel, MenuItem, FormControl, Select, Typography, FormHelperText, Button,
  Radio, RadioGroup, FormControlLabel, TextField, useTheme, useMediaQuery, Divider,
} from '@material-ui/core';
import TimeSelect from '../../../elements/timeSelect';
import { AbsentFormContext } from '../absentFormContext/absentContext';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
// import { useLocation } from 'react-router';

const AbsentFormStep2 = () => {
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'));
  const {
    departmentList, selectedDepartment, setSelectedDepartment, shiftType,
    setShiftType, shiftLocation, setShiftLocation, setShiftTiming, shiftTiming,
    selectedAbsentReason, routeResponse,
    handleError, setHandleError,
    handleLocationError, setHandleLocationError,
    timeError, setTimeError,
  } = useContext(AbsentFormContext);

  const arr1 = [{
    shiftStartTime: '',
    shiftEndTime: '',
  }];

  const arr2 = [{
    shiftStartTime: '',
    shiftEndTime: '',
    absenceStartTime: '',
    absenceEndTime: ''
  }];

  useEffect(() => {
    if (routeResponse?.daysType === 'multiple') {
      setShiftTiming([{
        shiftStartTime: '00:00',
        shiftEndTime: '00:00',
      }]);
    } else if (selectedAbsentReason === 'Late') {
      setShiftType('noshift');
      setShiftTiming(arr2);
    } else if (
      selectedAbsentReason === 'Designated Events' ||
      selectedAbsentReason === 'Miscellaneous'
    ) {
      setShiftType('noshift');
      setShiftTiming(arr1);
    } else {
      setShiftTiming(arr1);
    }
  }, []);

  useEffect(() => {
    if (shiftType === 'partialShift') {
      setShiftTiming(arr2);
    } else if (shiftType === 'fullShift') {
      setShiftTiming(arr1);
    }
  }, [shiftType]);

  const addAdditionalRequest = () => {
    let arr = [...shiftTiming];
    let errorArr = [...timeError];
    arr.push({
      shiftStartTime: '',
      shiftEndTime: '',
    });
    errorArr.push({
      shiftStartTime: {
        hourError: false,
        minuteError: false
      },
      shiftEndTime: {
        hourError: false,
        minuteError: false
      },
    })
    setShiftTiming(arr);
    setTimeError(errorArr);
  }

  const removeAdditionalRequest = (index) => {
    let arr = [...shiftTiming];
    let errorArr = [...timeError];
    arr.splice(index, 1);
    errorArr.splice(index, 1);
    setShiftTiming(arr);
    setTimeError(errorArr);
  }

  const handleTime = (value, key, i) => {
    setShiftTiming((data) => {
      const newData = [...data];
      switch (key) {
        case key:
          newData[i][key] = value;
          return newData;
        default:
          return null;
      }
    });
  };

  const renderSwitchOnAbsense = (absenseReason) => {
    switch (absenseReason) {
      case 'Vaccine':
      case 'Pandemic Leave':
      case 'Sick':
      case 'Bereavement':
      case 'FMLA - Personal':
      case 'FMLA – Caregiver':
      case 'FMLA – Pending':
        return partialAndFullGrid;

      case 'Late':
        return <Grid item md={4} xs={12}>{partialShift}</Grid>;

      case 'Designated Events':
      case 'Miscellaneous':
        return <Grid item md={4} xs={12}>{fullShift}</Grid>;
    }
  }

  const TimeSelection = ({ label, key, margin, i = 0 }) => (
    <Grid container spacing={2} style={{ marginTop: margin }}>
      <Grid item md={12} xs={12}>
        <Typography className="timeTypography">{label}</Typography>
        <TimeSelect
          handleTime={(value) => handleTime(value, key, i)}
          name={key}
          i={i}
        // handleError={() => handleError(key,)}
        />
      </Grid>
    </Grid>
  );

  const fullShift = <Grid container spacing={1}>
    {/* <Grid item md={7} xs={12}>
      {TimeSelection('Shift Start Time (Required):', 'startTime')}
      {TimeSelection('Shift End Time (Required):', 'endTime', '1rem')}
    </Grid>
    <Divider style={{ width: '100%' }} /> */}

    {shiftTiming.length ? shiftTiming.map((req, i) => (
      <Grid item md={11} xs={12}>
        <Grid>
          {TimeSelection({ label: 'Shift Start Time (Required):', key: 'shiftStartTime', i })}
          {TimeSelection({ label: 'Shift End Time (Required):', key: 'shiftEndTime', margin: '1rem', i })}
          {i > 0 ? <Button
            variant="text"
            style={{ textTransform: 'initial', margin: '1rem 0', color: '#c30019' }}
            onClick={() => removeAdditionalRequest(i)}
          >
            <RemoveCircleOutlineOutlinedIcon />
            <strong>&nbsp;&nbsp;Delete this request</strong>
          </Button> : null}
        </Grid>
        <Divider />
      </Grid>
    )) : null}
    <Grid item md={11} xs={12}>
      <Button
        variant="text"
        color="primary"
        style={{ textTransform: 'initial', margin: '1rem 0' }}
        onClick={addAdditionalRequest}
      >
        <AddCircleOutlineOutlinedIcon />
        <strong>&nbsp;&nbsp;Add an additional request</strong>
      </Button>
      <Typography
        style={{
          color: '#c30019', fontWeight: 'bold',
          fontFamily: 'AmericanSans-MediumItalic,Roboto,sans-serif',
          fontSize: '14px',
        }}
      >
        <em>
          * Requests are for a single shift.
          If you absent affects more than one shift in the same day.
          Please click the &quot;Add&quot; button to submit on additional
          request for each shift affected.
        </em>
      </Typography>
    </Grid>
  </Grid>;

  const partialShift =
    <Grid item md={11} xs={12}>
      {TimeSelection({ label: 'Shift Start Time (Required):', key: 'shiftStartTime' })}
      {TimeSelection({ label: 'Shift End Time (Required):', key: 'shiftEndTime', margin: '1rem' })}
      {TimeSelection({ label: 'Abscence Start Time (Required):', key: 'absenceStartTime', margin: '1rem' })}
      {TimeSelection({ label: 'Abscence End Time (Required):', key: 'absenceEndTime', margin: '1rem' })}
    </Grid>


  const departmentDiv = <FormControl required variant="outlined" style={{ width: '220px' }} error={handleError}>
    <InputLabel id="absence-department-select">Department - Required</InputLabel>
    <Select
      labelId="absence-department-select"
      id="demo-simple-select"
      required
      value={selectedDepartment}
      label="Department - Required"
      onClose={() => { setTimeout(() => { document.activeElement.blur(); }, 0); }}
      onFocus={() => setHandleError(false)}
      onBlur={() => (!selectedDepartment ? setHandleError(true) : '')}
      onChange={(e) => setSelectedDepartment(e.target.value)}
    >
      {departmentList?.map((item) => (
        <MenuItem value={item?.label} key={item?.id} translate="yes">{item?.label}</MenuItem>
      ))}
    </Select>
    <FormHelperText hidden={!handleError}><em>Please select a Department</em></FormHelperText>
  </FormControl>;

  const partialAndFullGrid = <Grid item md={4} xs={12}>
    <Typography className="typography">
      Is this request for a full shift or a partial shift?
    </Typography>
    <FormControl component="fieldset">
      <RadioGroup
        row aria-label="shift"
        name="row-radio-buttons-group"
        value={shiftType}
        onChange={(e) => setShiftType(e.target.value)}
      >
        <FormControlLabel
          color="primary"
          value="fullShift"
          control={<Radio color="primary" />}
          label={
            <Typography
              style={{
                fontWeight: '700',
                color: '#00467f',
                fontSize: '16px',
                fontFamily: 'AmericanSans-Medium,Roboto,sans-serif'
              }}
            >
              Full Shift
            </Typography>
          } />
        <FormControlLabel
          color="primary" value="partialShift"
          control={<Radio color="primary" />}
          label={
            <Typography
              style={{
                fontWeight: '700',
                color: '#00467f',
                fontSize: '16px',
                fontFamily: 'AmericanSans-Medium,Roboto,sans-serif'
              }}
            >
              Partial Shift
            </Typography>
          } />
      </RadioGroup>
    </FormControl>
    {
      shiftType === "fullShift" ? (
        fullShift
      ) : shiftType === "partialShift" ?
        partialShift
        : null
    }
  </Grid >;

  return (
    <Grid container spacing={2} style={{ padding: '1rem .5rem 2rem .5rem' }}>
      <Grid item md={12} xs={12}>
        <Typography
          // color="secondary"
          // style={{ fontSize: '.9rem' }}
          className="typography"
        >
          Please select your department and shift location
        </Typography>
      </Grid>
      <Grid item md={2} xs={12}>
        {departmentDiv}
      </Grid>
      {routeResponse?.daysType === 'single' && <Grid item md={12} xs={12}>
        <Grid container spacing={1} direction={isMobile ? 'column' : 'row'}>
          {renderSwitchOnAbsense(selectedAbsentReason)}
          <Grid item md={3} xs={12}>
            <TextField
              variant="outlined"
              label="Shift Location - Required"
              style={{ width: '220px' }}
              required
              onClose={() => { setTimeout(() => { document.activeElement.blur(); }, 0); }}
              onFocus={() => setHandleLocationError(false)}
              onBlur={() => (!shiftLocation ? setHandleLocationError(true) : '')}
              error={handleLocationError}
              helperText={handleLocationError ? 'Please enter your shift Location (e.g, Mumbai, Delhi, Bengalore, Hyderabad)' : '(e.g, Mumbai, Delhi, Bengalore, Hyderabad)'}
              value={shiftLocation}
              onChange={(e) => setShiftLocation(e.target.value.trimLeft())}
            />
          </Grid>
        </Grid>
      </Grid>}
    </Grid>
  );
};

export default AbsentFormStep2;
