import React, { useContext, useState } from 'react';
import {
  Grid, InputLabel, MenuItem, FormControl, Select, FormControlLabel,
  useTheme, useMediaQuery, FormHelperText, Typography, RadioGroup, Radio, IconButton,
} from '@material-ui/core';
import Popover from '@material-ui/core/popover';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { AbsentFormContext } from '../absentFormContext/absentContext';
import AbsentReasonModelList from './absentReasonModelList';
import MessageModel from './messageModel';

const AbsentFormStep1 = () => {
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'));
  const {
    absentReasonList, selectedAbsentReason, setSelectedAbsentReason, fMlaStatus, setFMlaStatus,
    handleErrors, handleSetErrors,
  } = useContext(AbsentFormContext);
  const [openModel, setOpenModel] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container spacing={2} style={{ padding: '1rem .5rem 2rem .5rem' }}>
        <Grid item md={2} xs={11}>
          <FormControl variant="outlined" required style={{ width: '100%' }} error={handleErrors?.selectAbsentReason}>
            <InputLabel id="absence-reason-select">Absence Reason - Required</InputLabel>
            <Select
              labelId="absence-reason-select"
              id="demo-simple-select"
              value={selectedAbsentReason}
              label="Absence Reason - Required"
              onChange={(e) => {
                if (e.target.value === 'FMLA - Personal' || e.target.value === 'FMLA - Caregiver') {
                  setOpenConfirmation(true);
                }
                setFMlaStatus('');
                setSelectedAbsentReason(e.target.value);
              }}
              onClose={() => {
                setTimeout(() => {
                  document.activeElement.blur();
                }, 0);
              }}
             // onFocus={() => handleSetErrors('selectAbsentReason', false)}
              onBlur={(e) => {
                if (e.target.value === 'FMLA - Personal' || e.target.value === 'FMLA - Caregiver') {
                  setOpenConfirmation(true);
                } else if (!e.target.value) {
                  handleSetErrors('selectAbsentReason', true);
                }
              }}
            >
              {absentReasonList?.map((item) => (
                <MenuItem value={item?.label} key={item?.id} translate="yes">{item?.label}</MenuItem>
              ))}
            </Select>
            <FormHelperText hidden={!handleErrors?.selectAbsentReason}>
              <em>Please select absent reason</em>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={1} xs={1} onMouseLeave={handlePopoverClose}>
          <IconButton
            aria-describedby={id}
            onMouseEnter={handlePopoverOpen}
            size="large"
            onClick={() => setOpenModel(true)}
          >
            <HelpOutlineIcon />
          </IconButton>
          <ClickAwayListener onClickAway={handlePopoverClose}>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
            >
              <Typography
                color="secondary"
                style={{
                  padding: '6px', backgroundColor: 'gray', fontWeight: 'bold', color: 'white',
                }}
              >
                Click hear if you&apos;re unsure which reason to select
              </Typography>
            </Popover>
          </ClickAwayListener>
        </Grid>
        {selectedAbsentReason === 'FMLA - Pending' ? (
          <Grid item md={12} xs={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Typography color="secondary" style={{ marginRight: '10px' }}>
              Please select which FMLA option you have applied for :&nbsp;
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="FLMAstatus" name="row-radio-buttons-group" value={fMlaStatus} onChange={(e) => { setFMlaStatus(e.target.value); }}>
                <FormControlLabel color="prePrimary" value="yes" control={<Radio color="prePrimary" />} label={<Typography color="prePrimary" style={{ fontWeight: 'bold' }}>Yes</Typography>} />
                <FormControlLabel color="prePrimary" value="no" control={<Radio color="prePrimary" />} label={<Typography color="prePrimary" style={{ fontWeight: 'bold' }}>No</Typography>} />
              </RadioGroup>
            </FormControl>
          </Grid>
        ) : null}
      </Grid>
      {openModel ? (
        <AbsentReasonModelList
          isMobile={isMobile}
          openModel={openModel}
          absentReasonList={absentReasonList || []}
          onClose={() => setOpenModel(false)}
        />
      ) : null}
      {openConfirmation ? (
        <MessageModel
          isMobile={false}
          openModel={openConfirmation}
          message="Before submitting a request, please make sure you have an active FMLA status."
          callBack={() => setOpenConfirmation(false)}
          onClose={() => setOpenConfirmation(false)}
        />
      ) : null}
    </>
  );
};

export default AbsentFormStep1;
