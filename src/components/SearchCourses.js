import React from 'react'
import { Input } from 'antd'
import Course from './Course'
import {connect} from 'react-redux'
import Sidebar from './Sidebar'

import './SearchCourses.css'



class SearchCourses extends React.Component {

    state = {
        searchResults: [],
    }

    handleInputText(input) {

        if (input !== '') {
            let filteredArr = []
            let numberOfFilteredItems = 0
            for (let i = 0; i < this.props.coursePool.length; i++) {
                let coursePool = [...this.props.coursePool]
                if (coursePool[i].courseTitle.toUpperCase().includes(input.toUpperCase()) || coursePool[i].courseNo.toUpperCase().includes(input.toUpperCase())) {
                    filteredArr.push(coursePool[i])
                    numberOfFilteredItems = numberOfFilteredItems + 1
                    this.setState(() => ({ searchResults: [...filteredArr] }))
                    if(numberOfFilteredItems > 18) {
                        break
                    }
                }
            }
        }
        else this.setState(() => ({searchResults: []}))
    }

    clearSearchResults() {
        this.setState(() => ({ searchResults: [] }))
    }

    render() {
        return (
            <React.Fragment>
                <div style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 24, flexDirection: 'column', alignItems: 'center'}}>
                    <div className='TopSection'>
                        <Input.Search
                            placeholder='Search courses...'
                            style={{width: 500}}
                            size='large'
                            enterButton
                            onChange={({ target }) => this.handleInputText(target.value)}
                        />
                        <Sidebar />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {this.state.searchResults.map(result => (
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
})

export default connect(mapStateToProps)(SearchCourses)