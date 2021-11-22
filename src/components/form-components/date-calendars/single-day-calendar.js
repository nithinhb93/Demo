import React from "react";
import { LocalizationProvider, DatePicker } from '@mui/lab';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import addDays from 'date-fns/addDays';
import "./calendar.css";

function SingleDayCalendarInput ({ date, onChange }) {
  
  return (
    <div>
        <LocalizationProvider dateAdapter={ AdapterDateFns }>
          <DatePicker
            label="Start Date - Required"
            disablePast
            maxDate={ addDays(new Date(), 1) }
            value={ date }
            onChange={ onChange }
            renderInput={(params) => <TextField 
              { ...params }
              variant="outlined"
              className="textfield"
              required
              InputLabelProps={{
                shrink: true,
              }}
              />}
          />
        </LocalizationProvider>
    </div>
  )
}

export default SingleDayCalendarInput

