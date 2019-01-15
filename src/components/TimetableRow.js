import React from 'react';

const TimetableGrid = props => (
    <div className='Row'>
        {props.row.map((element, index) => <div key={index}>{element}</div>)}
    </div>
)

export default TimetableGrid