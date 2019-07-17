import React, { Component } from 'react'
import CourseList from './components/courses/CourseList'
import Timetable from './components/timetable/Timetable'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import { connect } from 'react-redux'
import { initGoogleAPI } from './components/header/GoogleCalendar/scripts/login'

class App extends Component {

    componentDidMount(){
        console.log("App montada!");
        initGoogleAPI()
      }    
    //   handleLogout = () => {
    //     gapi.auth2.getAuthInstance().signOut();
    //   }
    

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Header/>
                <CourseList/>
                <Timetable/>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    timetable: state.timetable,
})

export default connect(mapStateToProps)(App);
