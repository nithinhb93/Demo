import React from 'react';
import { AbsentFormContextProvider } from './absentContext';
import AbsentRequestForm from '../index';

const AbsentRequestFormContextProvider = () => (
  <AbsentFormContextProvider>
    <AbsentRequestForm />
  </AbsentFormContextProvider>
);

export default AbsentRequestFormContextProvider;
