import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CustomDialogModel from '../../../elements/customDialog';

const AbsentReasonModelList = ({
  openModel, onClose, absentReasonList, isMobile,
}) => {
  const theme = JSON.parse(window.localStorage.getItem('theme'));
  return (
    <CustomDialogModel
      open={openModel}
      onClose={onClose}
      fullScreen={isMobile}
      maxWidth="lg"
    >
      <Grid container spacing={2}>
        {absentReasonList?.map((item) => (
          <Grid item md={12} xs={12} key={item.id}>
            <p translate="yes">
              <strong style={{ color: theme?.palette?.primary?.main }}>{item?.label}</strong>
                  &nbsp;-&nbsp;
              {item?.description}
            </p>
          </Grid>
        ))}
      </Grid>
    </CustomDialogModel>
  );
};

AbsentReasonModelList.propTypes = {
  openModel: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  absentReasonList: PropTypes.instanceOf(Array).isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default AbsentReasonModelList;
