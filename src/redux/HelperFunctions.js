export const addCourseHelper = (section, state, course) => {
    if (section !== null) {
        for(let i = 0; i < section.days.length; i++) {
            for(let j = 0; j < section.hours.length; j++) {
                let sectionToAdd = { ...section, courseTitle: course.courseTitle, courseNo: course.courseNo, compreDate: course.compreDate, clashExists: course.clashExists }
                state[section.hours[j]-1][section.days[i]+1] = sectionToAdd
            }
        }
    }

    return state
}

export const deleteCourseHelper = (course, timetable) => {
    for(let i = 0; i < timetable.length; i++) {
        for(let j = 1; j < timetable[i].length; j++) {
            if(timetable[i][j] !== null && timetable[i][j].courseNo === course.courseNo) {
                timetable[i][j] = null
            }
        }
    }

    return timetable
}