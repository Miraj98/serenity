import React, { Component } from 'react'
import SearchCourses from './SearchCourses'
import Timetable from './Timetable/Timetable'
import Footer from './Footer'
import Header from './Header'
import { connect } from 'react-redux'

class App extends Component {
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Header />
                <SearchCourses />
                <Timetable />
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    timetable: state.timetable,
})

export default connect(mapStateToProps)(App);
