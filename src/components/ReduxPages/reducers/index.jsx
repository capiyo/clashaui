import { combineReducers } from 'redux';

import counter from './counter';
import userDetails from './userDetails';
import opener from './opener';
import rightPage from "./rightPage"
import caseData from './caseData';
import  gigStatus from './gigStatus';
import overlay from "./overlay";
import auth from './auth';
import footerOverlay from './footerOverlay';



export const reducers = combineReducers({counter,userDetails,gigStatus,opener,rightPage,caseData,overlay,auth,footerOverlay});
