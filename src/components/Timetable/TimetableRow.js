import React from 'react';

const TimetableGrid = props => (
    <div className='Row'>
        {props.row.map((element, index) => {
            if(element !== null && index !== 0) {
                return <div key={index}>
                    <div style={{fontSize: 10}}><b>{element.courseTitle}</b></div>
                    <div style={{fontSize: 8}}>{element.courseNo}</div>
                </div>
            } else {
                return <div key={index}>{element}</div>
            }
        })}
    </div>
)

export default TimetableGrid