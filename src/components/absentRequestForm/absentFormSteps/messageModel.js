import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CustomDialogModel from '../../../elements/customDialog';

const MessageModel = ({
  openModel, onClose, isMobile, callBack, message,
}) => (
  <CustomDialogModel
    open={openModel}
    onClose={onClose}
    fullScreen={isMobile}
    maxWidth="md"
  >
    <Grid container spacing={2} justifyContent="center" alignItems="center" direction="column">
      <Grid item md={12} xs={12} style={{ margin: '1rem' }}>
        <Typography color="secondary" style={{ fontSize: '14px' }}>{message}</Typography>
      </Grid>
      <Grid item md={12} xs={12} style={{ margin: '.5rem' }}>
        <Button style={{ textTransform: 'initial' }} variant="contained" color="primary" onClick={callBack}>Yes, I Have confirmed eligiblity</Button>
      </Grid>
    </Grid>
  </CustomDialogModel>
);
MessageModel.propTypes = {
  openModel: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  callBack: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default MessageModel;
