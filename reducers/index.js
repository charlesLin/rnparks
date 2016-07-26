import { combineReducers } from 'redux';
import parks  from './parksReducer';
const rootReducer = combineReducers({ parks });

export default rootReducer;