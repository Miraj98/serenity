import React from 'react';

const colors = ['#f44336', '#9c27b0', '#4d2c91', '#039be5', '#0097a7', '#009688', '#4caf50', '#f9a825', '#ef6c00', '#616161']

const colorGenerator = (courseNo, coursesAdded) => {
    let colorIndex = 0
    for(let i = 0; i < coursesAdded.length; i++) {
        if(coursesAdded[i].courseNo === courseNo) {
            colorIndex = i
        }
    }
    return colors[colorIndex]
}

const TimetableGrid = props => (
    <div className='Row'>
        {props.row.map((element, index) => {
            if(element !== null && index !== 0) {
                return <div key={index} style={{backgroundColor: colorGenerator(element.courseNo, props.coursesAdded)}}>
                    <div style={{fontSize: 12, color: 'white'}}><b>{element.courseTitle}</b></div>
                    <div style={{fontSize: 10.5, color: 'white'}}>{element.courseNo}: {`${element.type} section ${element.sectionNo}`}</div>
                </div>
            } else {
                return <div key={index}>{element}</div>
            }
        })}
    </div>
)

export default TimetableGrid