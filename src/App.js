import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePageComponent from "./components/home-page/home-page";
import NavigationBar from "./components/navbar/navbar";
import { ThemeProvider, createTheme } from "@material-ui/core";
import ThemeConfig from "./config/theme";
import AbsentRequestFormContextProvider from "./components/absentRequestForm/absentFormContext/absentContextProvider";
import jwt from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { decryptToken } from './actions';
// import "./App.css";

function App() {
  const Theme = createTheme(ThemeConfig);
  const dispatch = useDispatch();
  let decoded = jwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6Im9wZW5pZCBwcm9maWxlIiwiY2xpZW50X2lkIjoibG9zdHRpbWUtc3RhZ2UiLCJpc3MiOiJodHRwczovL2lkcHN0YWdlLmFhLmNvbSIsInVpZCI6IlMxMDA1NDg5IiwiZmlyc3RuYW1lIjoiUzEwMDU0ODkiLCJzdGF0aW9uIjoiREZXIiwidGl0bGUiOiJGdW5jdGlvbmFsIElELVN0YWdlIiwibGFzdG5hbWUiOiJST1ZSQVVUT1RFU1QyIiwiZXhwIjoxNjM2OTcyNDg3fQ.sMypaWWb-ruNkd1UZD9oK1sKI_ojwCrDSBJ6_gSYPIw');
  dispatch(decryptToken(decoded));
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <NavigationBar> </NavigationBar>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={HomePageComponent} />
            <Route
              path="/request-form"
              component={AbsentRequestFormContextProvider}
            />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
    // <>
    //   <NavigationBar></NavigationBar>
    //   <HomePageComponent></HomePageComponent>
    // </>
  );
}

export default App;
