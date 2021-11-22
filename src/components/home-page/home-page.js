import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Divider } from "@mui/material";
import { isAfter, format } from 'date-fns';
import useMediaQuery from '@mui/material/useMediaQuery';
import strings from "../../resources/strings.json";
import { useHistory, useLocation } from 'react-router-dom';
import MultiDayCalendarInput from "../form-components/date-calendars/multi-day-calendar";
import SingleDayCalendarInput from "../form-components/date-calendars/single-day-calendar";
import "./home-page.css"

function HomePageComponent() {
  const history = useHistory();
  // const location = useLocation();
  const isIE = /*@cc_on!@*/false || !!document.documentMode;
  const isMediaLarge = useMediaQuery('(min-width:600px)');

  const [showForm, toggleForm] = useState({ single: false, multi: false });
  const [btnDisabled, setBtnDisabled] = useState(true)

  const { control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      singleDay: null,
      multiDay: { start: null, end: null }
    }
  });

  const onSubmit = ({ singleDay, multiDay }) => {
    let startDate;
    let endDate;
    if (showForm.single) {
      // console.log(format(singleDay, 'MM/dd/yyyy'))
      startDate = format(singleDay, 'MM-dd-yyyy');
      endDate = format(singleDay, 'MM-dd-yyyy');
    } else {
      startDate = format(multiDay.start, 'MM-dd-yyyy');
      endDate = format(multiDay.end, 'MM-dd-yyyy');
      // console.log(format(multiDay.start, 'MM/dd/yyyy'), format(multiDay.end, 'MM/dd/yyyy'));
    }

    history.push({
      pathname: '/request-form',
      state: {
        // userProfile: userDetails,
        daysType: showForm.single ? "single" : "multiple",
        startDate,
        endDate,
      },
    });
  };

  const enableButton = () => {
    if (showForm.single && getValues(["singleDay"])[0]) {
      setBtnDisabled(false)
    } else if (showForm.multi) {
      if (getValues(["multiDay.start"])[0] && getValues(["multiDay.end"])[0]) {
        setBtnDisabled(false);
      }
    }
  }

  return (
    <div>
      <div>
        <h1 className="title" style={{ "fontSize": "28px" }}>Welcome to MyTime, </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="sub-title">Please select the duration of your absence to get started with your absence request:</p>
          <Button disableElevation variant={showForm.single ? "contained" : "outlined"} className="select-button" onClick={() => {
            toggleForm({ single: true, multi: false }); reset(); setBtnDisabled(true);
          }}
            style={{ "margin": "10px 0 10px 60px" }}>Single Day</Button>
          <Button disableElevation variant={showForm.multi ? "contained" : "outlined"} className="select-button" onClick={() => {
            toggleForm({ single: false, multi: true }); reset(); setBtnDisabled(true)
          }}
            style={{ "margin": "10px 0 10px 60px" }}>Multiple Days</Button>

          {showForm.single ? <div style={{ "margin": "25px 60px 0" }}>
            <p className="date-disclaimer">{strings.dateDisclaimerSingle}</p>
            <Controller
              control={control}
              name="singleDay"
              render={({ field: { value, onChange } }) => <SingleDayCalendarInput date={value} onChange={e => { onChange(e); enableButton() }} />}
            />
          </div> : null}

          {/* OPTIONS FOR MULTIPLE DAY REQUESTS */}
          {showForm.multi ? <div style={{ "margin": "25px 60px 0" }}>
            <p className="date-disclaimer">{strings.dateDisclaimerMulti}</p>
            <Controller
              control={control}
              name="multiDay"
              render={({ field: { value } }) => <MultiDayCalendarInput start={value.start} end={value.end}
                onChangeStart={(startDay) => {
                  var checkDate = isAfter(startDay, value.end);
                  checkDate ? value.end = null : enableButton();
                  setValue("multiDay", { start: startDay, end: value.end });
                }}
                onChangeEnd={(endDay) => { setValue("multiDay", { start: value.start, end: endDay }); enableButton() }} />}
            />
          </div> : null}

          {showForm.single || showForm.multi ? <div>
            <Button disableElevation disabled={btnDisabled} variant="contained" className="button" type="submit" style={{ "margin": "40px 60px 50px" }}>
              {strings.newRequestButton}
            </Button>
          </div> : null}
        </form>
      </div>
      <Divider style={{ "marginTop": "60px" }} variant="middle" />
      {/* REPORTS LINK: ADMIN ACCESS REQUIRED */}
      <div>
        <h1 className="title" style={{ "fontSize": "24px" }}>Admin Features:</h1>
        {/* ADMIN CHECK */}
        <div>
          {/* DESKTOP */}
          {isMediaLarge ? <div>
            <div className="inline">
              <Button disableElevation variant="contained" className="button" style={{ "margin": "10px 0 0 60px" }}>Generate Absence Reports</Button>
            </div>
            <div className="inline">
              <Button disableElevation variant="contained" className="button" style={{ "margin": "10px 0 0 30px" }}>Submit an Employee Request</Button>
            </div>
          </div> : null}

          {/* MOBILE */}
          {!isMediaLarge ? <div>
            <div style={{ "margin": "20px 0 0 60px" }}>
              <Button disableElevation variant="contained" className="button">Generate Absence Reports</Button>
            </div>
            <div style={{ "margin": "30px 0 0 60px" }}>
              <Button disableElevation variant="contained" className="button">Submit an Employee Request</Button>
            </div>
          </div> : null}
        </div>
      </div>

      {/* EDIT DL LINK: ADMIN ACCESS REQUIRED */}
      <div style={{ "margin": "30px 0 50px 60px" }}>
        <Button disableElevation variant="contained" className="button">Edit Email Report Frequencies</Button>
      </div>

      <Divider variant="middle" />

      {isIE ? <div style={{ "marginTop": "50px" }}>
        <p className="ie-disclaimer">
          ** If you are using Internet Explorer, we recommend switching over to another web browser such as Microsoft Edge, Google Chrome, Mozilla Firefox, or Safari to improve your experience using MyTime **
        </p>
      </div> : null}
    </div>
  )
}

export default HomePageComponent