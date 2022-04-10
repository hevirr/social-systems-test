import { combineReducers } from 'redux';
import requestReducer from './requestReducer';
import registrationModalReducer from './registrationModalReducer';

const rootReducer = combineReducers({ requestReducer, registrationModalReducer });

export default rootReducer;
