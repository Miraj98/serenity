import React from 'react';
import TimetableRow from './TimetableRow';
import './Timetable.css';
import store from '../redux/store';


export default class Timetable extends React.Component {

    constructor(props) {
        super(props)
        this.timetableLabels = //[
    [<div><b>Time(Hour)</b></div>,<div><b>Monday</b></div>,<div><b>Tuesday</b></div>,<div><b>Wednesday</b></div>,<div><b>Thursday</b></div>,<div><b>Friday</b></div>,<div><b>Saturday</b></div>]
            // [<div>1st Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>2nd Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>3rd Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>4th Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>5th Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>6th Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>7th Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>8th Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>9th Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>10th Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>11th Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>],
            // [<div>12th Hour</div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,<div> </div>,]
       // ]
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                {/* {this.timetableLabels.map((row, index) => (
                    <div className='Row' key={index}>
                        {row}
                    </div>
                ))} */}
                <div className='Row'>
                    {this.timetableLabels}
                </div>
                    {/* {store.getState().timetable.map(row => {
                        row.forEach((element, index)=>{
                            this[index] = <TimetableGrid data={element} className='grid'/>
                        }, row)
                        return <div className='Row' key={row[0]}>{row}</div>
                    })} */}

                    {store.getState().timetable.map(row => <TimetableRow row={row} key={row[0]}/>)}
            </div>
        )
    }

}