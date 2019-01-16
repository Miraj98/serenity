import React from 'react';
import { Radio } from 'antd';
import reverseDaysDictionary from './reverseDayDictionary';

const getSlots = (sectionDays, sectionHours) => {
    let days = ''
    sectionDays.forEach(day => {
        days = days +reverseDaysDictionary[day]
    })
    console.log(days)

    return sectionHours.map(hour => (days + ': ' + hour.toString() + ' '))
}

const Section = props => (
    <Radio.Group
        buttonStyle='solid'
        onChange={event => {props.handleSectionSelected(event.target.value)}}
    >
        {props.sections.map((section,index) => (
            <Radio.Button value={section} key={index}>{getSlots(section.days, section.hours)}</Radio.Button>
        ))}
    </Radio.Group>
)
    

export default Section