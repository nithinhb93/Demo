import React from "react";
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { addDays } from 'date-fns';
import { Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import strings from "../../../resources/strings.json"
import "./calendar.css";

function getDaysAfter(date, amount) {
  return date ? addDays(date, amount) : undefined;
}

function MultiDayCalendarInput ({ start, onChangeStart, end, onChangeEnd }) {
  const isMediaLarge = useMediaQuery('(min-width:650px)'); 

  return (
   <> <Stack direction={ isMediaLarge ? "row" : "column"} spacing={ 4 }><div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start Date - Required"
          name="start"
          disablePast
          value={ start }
          maxDate={ getDaysAfter(new Date(), 1) }
          onChange={ onChangeStart }
          renderInput={(params) => <TextField
            { ...params }
            variant="outlined"
            className="textfield"
            required
            InputLabelProps={{
              shrink: true,
            }} />} />
      </LocalizationProvider>
    </div><div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="End Date - Required"
            name="end"
            disablePast
            minDate = { start ? getDaysAfter(start, 1) : undefined }
            maxDate={ start ? getDaysAfter(start, 3) : getDaysAfter(new Date(), 3) }
            value={ end }
            onChange={ onChangeEnd }
            renderInput={(params) => <TextField
              { ...params }
              variant="outlined"
              className="textfield"
              required
              InputLabelProps={{
                shrink: true,
              }} />} />
        </LocalizationProvider>
      </div></Stack>
      {/* <Alert icon={false} className="disclaimer" severity="error">{ strings.absenceDisclaimer }</Alert> */}
      { end ? <p className="disclaimer">{ strings.absenceDisclaimer }</p> : null }
    </>
  )
}

export default  MultiDayCalendarInput

