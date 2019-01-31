//action types...
export const ADD_COURSE = 'ADD_COURSE'
export const DELETE_COURSE = 'DELETE_COURSE'
export const HANDLE_CLASHES = 'HANDLE_CLASHES'
export const SEARCH_RESULTS = 'SEARCH_RESULTS'
export const UPDATE_SIGNIN_STATUS = 'UPDATE_SIGNIN_STATUS'


export const addCourse = course => ({
    type: ADD_COURSE,
    payload: course
})

export const deleteCourse = course => ({
    type: DELETE_COURSE,
    payload: course
})

export const handleClashes = coursesAdded => ({
    type: HANDLE_CLASHES,
    payload: coursesAdded
})

export const addSearchResults = courses => ({
    type: SEARCH_RESULTS,
    payload: courses
})

export const updateSignInStatus = isSignedIn => ({
    type: UPDATE_SIGNIN_STATUS,
    payload: isSignedIn
})