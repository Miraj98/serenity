/* global gapi */
import React from 'react'
import  { Drawer, Icon, Button, message, notification } from 'antd'
import { connect } from 'react-redux'
import { deleteCourse, updateSignInStatus, handleSync } from '../../redux/actions'
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
        this.props.deleteCourse(course)
    }

    handleLogin = () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            this.props.updateSignInStatus(true)
        })
    }

    handleCalendarSync = () => {
        const hide = message.loading("Syncing with google calendar", 0)
        let coursesAdded = this.props.coursesAdded.filter(course => course.isSynced !== true)
        if(coursesAdded.length > 0) {
            let batch = gapi.client.newBatch()
            for(let i = 0; i < coursesAdded.length; i++) {
                if(coursesAdded[i].isSynced === false) {
                    if(coursesAdded[i].lectureSectionSelected !== null) {
                        let lectureSectionSelected = coursesAdded[i].lectureSectionSelected
                        batch.add( gapi.client.calendar.events.insert({
                            calendarId: 'primary',
                            resource: createResourceObject(coursesAdded[i].courseTitle, 'Lecture', lectureSectionSelected.roomNo, createDateValue(lectureSectionSelected), createDateValue(lectureSectionSelected, lectureSectionSelected.hours.length), createDaysValueForCalendar(lectureSectionSelected.days), '20190501')
                        }))
                    }
                    if(coursesAdded[i].tutorialSectionSelected !== null) {
                        let tutorialSectionSelected = coursesAdded[i].tutorialSectionSelected
                        batch.add(gapi.client.calendar.events.insert({
                            calendarId: 'primary',
                            resource: createResourceObject(coursesAdded[i].courseTitle, 'Tutorial', tutorialSectionSelected.roomNo, createDateValue(tutorialSectionSelected), createDateValue(tutorialSectionSelected, tutorialSectionSelected.hours.length), createDaysValueForCalendar(tutorialSectionSelected.days), '20190501')
                        }))
                    }
                    if(coursesAdded[i].practicalSectionSelected !== null) {
                        let practicalSectionSelected = coursesAdded[i].practicalSectionSelected
                        batch.add(gapi.client.calendar.events.insert({
                            calendarId: 'primary',
                            resource: createResourceObject(coursesAdded[i].courseTitle, 'Practical', practicalSectionSelected.roomNo, createDateValue(practicalSectionSelected), createDateValue(practicalSectionSelected, practicalSectionSelected.hours.length), createDaysValueForCalendar(practicalSectionSelected.days), '20190501')
                        }))
                    }
                    this.props.handleSync(coursesAdded[i])
                }
            }
            console.log(batch)
            batch.then((event) => {
                if(event.status === 200) {
                    hide()
                    notification['success']({
                        message: 'Synced with Google Calendar'
                    })
                } else {
                    hide()
                    notification['error']({
                        message: 'Failed to sync',
                        description: 'Open your browser console and inform the developers about the error you got.'
                    })
                }
    
            })
        } else if(coursesAdded.length === 0){
            hide()
            notification['warn']({
                message: 'All courses already synced'
            })
        }

    }

    render() {
        return (
            <div>
                <Button type='primary' onClick={() => this.showDrawer()} style={{margin: 4}}>
                    <span><Icon type="shopping-cart" style={{fontSize: 18}}/></span><span style={{marginLeft: '0.5em'}}>My Cart</span>
                </Button>

                <Button onClick={this.props.isSignedIn ? this.handleCalendarSync : this.handleLogin}>
                    <span><Icon type="google" theme="outlined" style={{fontSize: 18}}/></span><span style={{marginLeft: '0.5em'}}>{this.props.isSignedIn ? `Sync with Google calendar` : `Sign In`}</span>
                </Button>

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

const mapDispatchToProps = {
    deleteCourse,
    updateSignInStatus,
    handleSync
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)