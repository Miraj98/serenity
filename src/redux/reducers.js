import {combineReducers} from 'redux'
import emptyTimetable from './emptyTimetable'
import { ADD_COURSE, DELETE_COURSE, HANDLE_CLASHES, SEARCH_RESULTS, UPDATE_SIGNIN_STATUS, HANDLE_SYNC } from './actions'
import CoursePool from './scripts/CoursePool'
import { handleCompreClash } from './scripts/Clashes'
import  { addCourseHelper, deleteCourseHelper } from './scripts/HelperFunctions'



//reducers...
const timetableReducer = (state= emptyTimetable, action) => {
    switch(action.type) {

        case ADD_COURSE:
            state = [...addCourseHelper(action.payload.lectureSectionSelected, state, action.payload)]
            state = [...addCourseHelper(action.payload.tutorialSectionSelected, state, action.payload)]
            state = [...addCourseHelper(action.payload.practicalSectionSelected, state, action.payload)]
            break

        case DELETE_COURSE:
            state = [...deleteCourseHelper(action.payload, state)]
            break

        default:
            break

    }
    return state
}

const coursesAddedReducer = (state=[], action) => {
    if(action.type === ADD_COURSE) {
        console.log([...state, action.payload])
        return [...state, action.payload]
    }
    if(action.type === DELETE_COURSE) {
        return [...state.filter(course => course.courseNo !== action.payload.courseNo)]
    }
    if(action.type === HANDLE_SYNC) {
        return [...state.map(course => course.courseNo === action.payload.courseNo ? {...course, isSynced: true} : course)]
    }
    
    return state
}

const coursePoolReducer = (state = CoursePool, action) => { 
    if(action.type === HANDLE_CLASHES) {
        let coursesAdded = action.payload

        for(let i = 0; i < coursesAdded.length; i++) {
            let date = coursesAdded[i].compreDate.date.getDate()
            let time = coursesAdded[i].compreDate.time

            for(let j = 0; j < state.length; j++) {
                if(state[j].compreDate !== null && !state[j].clashExists.exists) {
                    let currentCourseDate = state[j].compreDate.date.getDate()
                    let currentCourseTime = state[j].compreDate.time
                    if(currentCourseDate === date && currentCourseTime === time) {
                        state[j] = { ...state[j], clashExists: handleCompreClash(state[j].clashExists, true, coursesAdded[i].courseNo) }
                    }
                }
            }
        }
        return [...state]
    }
    if(action.type === DELETE_COURSE) {
        for(let i = 0; i < state.length; i++) {
            if(state[i].clashExists.exists) {
                state[i].clashExists.reasons = [...state[i].clashExists.reasons.filter(clash => (clash.type==="Compre Clash" && clash.course !== action.payload.courseNo))]
                if(state[i].clashExists.reasons.length === 0) state[i].clashExists.exists = false
            }
        }

        return [...state]
    }

    return state
}

const searchResultsReducer = (state=[], action) => {
    if(action.type === SEARCH_RESULTS) return [...action.payload]
    return state
}

const isSignedInReducer = (state = false, action) => {
    if(action.type === UPDATE_SIGNIN_STATUS) return action.payload
    return state
} 

const reducers = combineReducers({
    timetable: timetableReducer,
    coursePool: coursePoolReducer,
    searchResults: searchResultsReducer,
    coursesAdded: coursesAddedReducer,
    isSignedIn: isSignedInReducer
})

export default reducers

