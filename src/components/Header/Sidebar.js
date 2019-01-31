/* global gapi */
import React from 'react'
import CalendarSync from './GoogleCalendar/CalendarSync'
import  { Drawer, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { deleteCourse, updateSignInStatus } from '../../redux/actions'
import store from '../../redux/store';
import {createResourceObject, createDaysValueForCalendar, createDateValue} from './GoogleCalendar/scripts/sortCoursesByDay'


class Sidebar extends React.Component {
    state = {
        visible: false
    }

    showDrawer() {
        this.setState(() => ({ visible: true }))
    }

    closeDrawer() {
        this.setState(() => ({ visible: false }))
    }

    handleRemoveCourse(course) {
        store.dispatch(deleteCourse(course))
    }

    handleLogin = () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            store.dispatch(updateSignInStatus(true))
            console.log("Logged in??")
        })
    }

    handleCalendarSync = () => {
        let coursesAdded = this.props.coursesAdded
        let batch = gapi.client.newBatch()
        console.log(batch)
        for(let i = 0; i < coursesAdded.length; i++) {
            if(coursesAdded[i].lectureSectionSelected !== null) {
                let lectureSectionSelected = coursesAdded[i].lectureSectionSelected
                batch.add( gapi.client.calendar.events.insert({
                    calendarId: 'primary',
                    resource: createResourceObject(coursesAdded[i].courseTitle, 'Lecture', lectureSectionSelected.roomNo, createDateValue(lectureSectionSelected), createDateValue(lectureSectionSelected, lectureSectionSelected.hours.length), createDaysValueForCalendar(lectureSectionSelected.days), '20190501')
                }))
                
                // request.execute(event => console.log(event))
            }
            if(coursesAdded[i].tutorialSectionSelected !== null) {
                let tutorialSectionSelected = coursesAdded[i].tutorialSectionSelected
                batch.add(gapi.client.calendar.events.insert({
                    calendarId: 'primary',
                    resource: createResourceObject(coursesAdded[i].courseTitle, 'Tutorial', tutorialSectionSelected.roomNo, createDateValue(tutorialSectionSelected), createDateValue(tutorialSectionSelected, tutorialSectionSelected.hours.length), createDaysValueForCalendar(tutorialSectionSelected.days), '20190501')
                }))
                // batch.add(request)
                // request.execute(event => console.log(event))
            }
            if(coursesAdded[i].practicalSectionSelected !== null) {
                let practicalSectionSelected = coursesAdded[i].practicalSectionSelected
                batch.add(gapi.client.calendar.events.insert({
                    calendarId: 'primary',
                    resource: createResourceObject(coursesAdded[i].courseTitle, 'Practical', practicalSectionSelected.roomNo, createDateValue(practicalSectionSelected), createDateValue(practicalSectionSelected, practicalSectionSelected.hours.length), createDaysValueForCalendar(practicalSectionSelected.days), '20190501')
                }))
                // batch.add(request)
                // request.execute(event => console.log(event))
            }
        }
        console.log(batch)
        batch.execute(event => console.log(event))

    }

    render() {
        return (
            <div>
                <Button type='primary' onClick={() => this.showDrawer()} style={{margin: 4}}>
                    <span><Icon type="shopping-cart" style={{fontSize: 18}}/></span><span style={{marginLeft: '0.5em'}}>My Cart</span>
                </Button>

                <CalendarSync onClick={() => (this.props.isSignedIn ? this.handleCalendarSync : this.handleLogin)}/>

                <Drawer
                    title="Courses Added"
                    width={360}
                    placement="right"
                    closable={false}
                    onClose={() => this.closeDrawer()}
                    visible={this.state.visible}
                >
                    {this.props.coursesAdded.map(course => (
                        <div key={course.courseNo} style={{display: 'flex', flexDirection: 'row', margin: '0.5em'}}>
                            <div style={{width: '15em'}}>{course.courseTitle}</div><Button type="danger" onClick={() => this.handleRemoveCourse(course)}>Remove</Button>
                        </div>
                    ))}
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    coursesAdded: state.coursesAdded,
    isSignedIn: state.isSignedIn
})

export default connect(mapStateToProps)(Sidebar)