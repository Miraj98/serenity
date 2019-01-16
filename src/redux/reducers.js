import {combineReducers} from 'redux';
import emptyTimetable from './emptyTimetable'
import { ADD_COURSE, DELETE_COURSE } from './actions'

const addCourseHelper = (section, state, course) => {
    if (section !== null) {
        for(let i = 0; i < section.days.length; i++) {
            for(let j = 0; j < section.hours.length; j++) {
                state[section.hours[j]-1][section.days[i]+1] = course
            }
        }
    }

    return state
}

//reducers...
const timetableReducer = (state=[...emptyTimetable], action) => {
    switch(action.type) {

        case ADD_COURSE:
            state = addCourseHelper(action.payload.lectureSectionSelected, state, action.payload)
            state = addCourseHelper(action.payload.tutorialSectionSelected, state, action.payload)
            state = addCourseHelper(action.payload.practicalSectionSelected, state, action.payload)
            break

        case DELETE_COURSE:
            break

        default:
            break

    }
    return [...state]
}


const reducers = combineReducers({
    timetable: timetableReducer,
})

export default reducers

