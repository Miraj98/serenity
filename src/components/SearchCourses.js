import React from 'react'
import Course from './Course'
import {connect} from 'react-redux'
import store  from '../redux/store'
import { addSearchResults } from '../redux/actions'


import './SearchCourses.css'



class SearchCourses extends React.Component {

    clearSearchResults() {
        store.dispatch(addSearchResults([]))
    }

    render() {
        return (
            <React.Fragment>
                <div style={{display: 'flex', flex: 1, justifyContent: 'center', padding: '1.5em', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {this.props.searchResults.map(result => (
                            <Course
                                { ...result }
                                key={result.courseNo}
                                clearSearchResults={() => this.clearSearchResults()}
                            />
                        ))}
                    </div>
                    </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    timetable: state.timetable,
    coursePool: state.coursePool,
    searchResults: state.searchResults,
    coursesAdded: state.coursesAdded
})

export default connect(mapStateToProps)(SearchCourses)