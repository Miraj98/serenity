import React from 'react'
import Course from './Course'
import {connect} from 'react-redux'
import { addSearchResults } from '../../redux/actions'
import './CourseList.css'



class CourseList extends React.Component {

    clearSearchResults() {
        this.props.addSearchResults([])
    }

    render() {
        return (
            <div style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    padding: '1.5em',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {this.props.searchResults.map(result => (
                        <Course
                            course={result}
                            key={result.courseNo}
                            clearSearchResults={() => this.clearSearchResults()}
                        />
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    timetable: state.timetable,
    coursePool: state.coursePool,
    searchResults: state.searchResults,
    coursesAdded: state.coursesAdded
})

const mapDispatchToProps = {
    addSearchResults
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseList)