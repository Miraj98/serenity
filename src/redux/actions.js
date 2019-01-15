//action types...
export const ADD_COURSE = 'ADD_COURSE'
export const DELETE_COURSE = 'DELETE_COURSE'


export const addCourse = course => ({
    type: ADD_COURSE,
    payload: course
})

export const deleteCourse = course => ({
    type: DELETE_COURSE,
    payload: course
})