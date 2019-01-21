import React from 'react'
import { Radio, Popover } from 'antd'
import reverseDaysDictionary from '../reverseDayDictionary'
import { checkTimingClash } from '../Clashes'
import store from '../redux/store'

const getSlots = (sectionDays, sectionHours) => {
    let days = ''
    sectionDays.forEach(day => {
        days = days +reverseDaysDictionary[day]
    })
    return sectionHours.map(hour => (days + ': ' + hour.toString() + ' '))
}

const Section = props => (
    <Radio.Group
        buttonStyle='solid'
        onChange={event => {props.handleSectionSelected(event.target.value)}}
    >
        {props.sections.map((section,index) => (
            <Popover
                key={index}
                title={`${section.type} section: ${section.sectionNo}`}
                content={section.instructors.map(instructor => `${instructor.instructor}, `)}
            >
                <Radio.Button disabled={checkTimingClash(section, store.getState().timetable)} value={section} key={index}>{getSlots(section.days, section.hours)}</Radio.Button>
            </Popover>
        ))}
    </Radio.Group>
)
    

export default Section