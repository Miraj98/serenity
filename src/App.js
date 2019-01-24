import React, { Component } from 'react'
import SearchCourses from './components/Header/SearchCourses'
import Timetable from './components/Timetable/Timetable'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
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
