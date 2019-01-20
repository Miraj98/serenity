//creating clash objects

export const handleCompreClash = (currentClashState, exists, courseNo) => ({
    exists,
    reasons: [...currentClashState.reasons, {
        type: "Compre Clash",
        course: courseNo
    }]
})

export const addTimingClash = (currentClashState, exists, courseNo) => ({
    exists,
    reasons: [...currentClashState.reasons, {
        type: "Timing Clash",
        course: courseNo
    }]
})

export const checkTimingClash = (section, timetable) => {

    let clashState = false

    for(let i = 0; i < section.days.length; i++) {
        for (let j = 0; j < section.hours.length; j++) {
            if(timetable[section.hours[j] - 1][section.days[i] + 1] !== null) {
                clashState = true
            }
        }
    }
    
    return clashState

}
