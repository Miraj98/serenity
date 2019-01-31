const reverseDayDictionaryForCalendarSync = {
    0: "MO",
    1: "TU",
    2: "WE",
    3: "TH",
    4: "FR",
    5: "SA",
}

const hour = {
    1: 8,
    2: 9,
    3: 10,
    4: 11,
    5: 12,
    6: 13,
    7: 14,
    8: 15,
    9: 16,
    10: 17,
    11: 18,
    12: 19
}

const sortCoursesByDay = coursesAdded => {
    let sortedCourses = [
        [],
        [],
        [],
        [],
        [],
        []
    ]

    for(let i = 0; i < coursesAdded.length; i++) {
        let course = coursesAdded[i]
        if(course.lectureSectionSelected !== null) {
            for(let j = 0; j < course.lectureSectionSelected.days.length; j++) {
                sortedCourses[course.lectureSectionSelected.days[j]].push({
                    ...course,
                    type: 'Lecture',
                    lectureSections: null,
                    practicalSections: null,
                    tutorialSections: null,
                    tutorialSectionSelected:null,
                    practicalSectionSelected: null
                })
            }
        }
        if(course.tutorialSectionSelected !== null) {
            for(let j = 0; j < course.tutorialSectionSelected.days.length; j++) {
                sortedCourses[course.tutorialSectionSelected.days[j]].push({
                    ...course,
                    type: 'Tutorial',
                    lectureSections: null,
                    practicalSections: null,
                    tutorialSections: null,
                    lectureSectionSelected:null,
                    practicalSectionSelected: null
                })
            }
        }
        if(course.practicalSectionSelected !== null) {
            for(let j = 0; j < course.practicalSectionSelected.days.length; j++) {
                sortedCourses[course.practicalSectionSelected.days[j]].push({
                    ...course,
                    type: 'Practical',
                    lectureSections: null,
                    practicalSections: null,
                    tutorialSections: null,
                    tutorialSectionSelected:null,
                    lectureSectionSelected: null
                })
            }
        }
    }

    console.log(sortedCourses)
    return sortedCourses

}

export default sortCoursesByDay

export const createResourceObject = (courseTitle, sectionType, roomNo, startTime, endTime, days, recurrenceEndDate) => ({
    summary: `${courseTitle} ${sectionType}`,
    description: `Room no: ${roomNo}`,
    start: {
        dateTime: `${startTime}`,
        timeZone: 'Asia/Calcutta'
    },
    end: {
        dateTime: `${endTime}`,
        timeZone: 'Asia/Calcutta'
    },
    recurrence: [
        `RRULE:FREQ=WEEKLY;UNTIL=${recurrenceEndDate};BYDAY=${days}`
    ],
    reminders: {
        useDefault: false,
        overrides: [
          {method: 'email', minutes: 24 * 60},
          {method: 'popup', minutes: 10}
        ]
    }
})

export const createDaysValueForCalendar = days => {
    let returnValue = ''

    for(let i = 0; i < days.length; i++) {
        if(i === days.length-1) {
            returnValue = returnValue + reverseDayDictionaryForCalendarSync[days[i]]
        } else {
            returnValue = returnValue + reverseDayDictionaryForCalendarSync[days[i]] + ','
        }
    }

    console.log(returnValue)
    return returnValue

}

export const createDateValue = (section, classLength = 0) => {
    let date = new Date()
    let year = date.getFullYear()
    let monthIndex = date.getMonth()
    let day = date.getDay()
    let monthDay = date.getDate()
    console.log("Hour to add: ", section.hours[0])
    console.log("Equivalent ", hour[section.hours[0]])
    let requiredDate = new Date(year, monthIndex, monthDay + section.days[0] - day + 1, hour[section.hours[0]] + classLength, 0)
    return requiredDate.toISOString()
}


