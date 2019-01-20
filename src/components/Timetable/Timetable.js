import React from 'react';
import TimetableRow from './TimetableRow';
import './Timetable.css';
import { connect } from 'react-redux';


class Timetable extends React.Component {

    constructor(props) {
        super(props)
        this.timetableLabels = [<div><b>Time(Hour)</b></div>,<div><b>Monday</b></div>,<div><b>Tuesday</b></div>,<div><b>Wednesday</b></div>,<div><b>Thursday</b></div>,<div><b>Friday</b></div>,<div><b>Saturday</b></div>]
    }


    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <div className='Row'>
                    {this.timetableLabels.map((label, index) => <React.Fragment key={index}>{label}</React.Fragment>)}
                </div>
                {this.props.timetable.map(row => <TimetableRow row={row} coursesAdded={this.props.coursesAdded} key={row[0]}/>)}
            </div>
        )
    }

}

const mapStateToProps = state => ({
    timetable: state.timetable,
    coursesAdded: state.coursesAdded
})

export default connect(mapStateToProps)(Timetable)