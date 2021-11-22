import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Button } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CustomDialogModel from '../../../elements/customDialog';

const RequestSuccessModel = ({ open, handelClose, requestId }) => {
  const history = useHistory();
  return (
    <CustomDialogModel onClose={handelClose} open={open} styles={{ width: '500px' }}>
      <Grid container spacing={2} justifyContent="center" direction="column" alignItems="center">
        <Grid item md={12} xs={12}>
          <CheckCircleOutlineIcon style={{ color: 'green', fontWeight: 'bold', fontSize: '2rem' }} />
        </Grid>
        <Grid item md={12} xs={12}>
          <Typography color="primary" variant="h4" style={{ fontWeight: 'bold' }}>Thank You !</Typography>
        </Grid>
        <Grid item md={12} xs={12}>
          <Typography style={{ textAlign: 'center', margin: '.3rem 0px' }} color="secondary">Your absence request has been submitted and your confirmation number is</Typography>
          <Typography style={{ textAlign: 'center', margin: '.3rem 0px', fontWeight: 'bold' }} color="primary">{requestId}</Typography>
          <Typography style={{ textAlign: 'center', margin: '.3rem 0px' }} color="secondary">Please check your inbox for your email confirmation and request details</Typography>
        </Grid>
        <Grid item md={12} xs={12} style={{ textAlign: 'center', margin: '1rem 0px' }}>
          <Button variant="contained" color="primary" style={{ textTransform: 'initial' }} onClick={() => history.push('/')}>Return to Home</Button>
        </Grid>
      </Grid>
    </CustomDialogModel>
  );
};
RequestSuccessModel.propTypes = {
  open: PropTypes.bool.isRequired,
  handelClose: PropTypes.func.isRequired,
  requestId: PropTypes.string.isRequired,
};

export default RequestSuccessModel;
