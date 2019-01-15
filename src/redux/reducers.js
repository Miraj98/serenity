import {combineReducers} from 'redux';
import emptyTimetable from './emptyTimetable'

//reducers...
const timetableReducer = (state=[...emptyTimetable], action) => {
    return state
}


const reducers = combineReducers({
    timetable: timetableReducer,
})

export default reducers

