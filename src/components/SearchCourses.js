import React from 'react';
import { Input } from 'antd';
import Course from './Course';



export default class SearchCourses extends React.Component {

    state = {
        searchResults: [],
        coursePool: [...this.props.coursePool]
    }

    handleInputText(input) {

        if (input !== '') {
            var filteredArr = []
            var numberOfFilteredItems = 0
            for (let i = 0; i < this.state.coursePool.length; i++) {
                let coursePool = this.state.coursePool
                if (coursePool[i].courseTitle.toUpperCase().includes(input.toUpperCase()) || coursePool[i].courseNo.toUpperCase().includes(input.toUpperCase())) {
                    filteredArr.push(coursePool[i])
                    numberOfFilteredItems = numberOfFilteredItems + 1
                    this.setState(prev => ({ searchResults: [...filteredArr] }))
                    if(numberOfFilteredItems > 25) {
                        break
                    }
                }
            }
        }
        else this.setState(prev => ({searchResults: []}))
    }

    render() {
        return (
            <div style={{display: 'flex', flex: 1, justifyContent: 'center', padding: 24, flexDirection: 'column', alignItems: 'center'}}>
                <Input.Search
                    placeholder='Search courses...'
                    style={{width: 500}}
                    size='large'
                    enterButton
                    onChange={({ target }) => this.handleInputText(target.value)}
                />
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {this.state.searchResults.map(result => (<Course { ...result } key={result.courseNo} />))}
                </div>
            </div>
        )
    }
}