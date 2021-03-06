import React from 'react'
import { Button, Card, Collapse, Alert, notification } from 'antd'
import Section from './Section'
import { addCourse, handleClashes } from '../../redux/actions'
import { connect } from 'react-redux'

class Course extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...this.props.course,
            lectureSectionSelected: null,
            practicalSectionSelected: null,
            tutorialSectionSelected: null,
        }
    }

    handleSectionSelected(section) {
        switch(section.type) {

            case "Lecture":
                this.setState(() => ({ lectureSectionSelected: {...section} }))
                break
            
            case "Practical":
                this.setState(() => ({ practicalSectionSelected: {...section} }))
                break

            case "Tutorial":
                this.setState(() => ({ tutorialSectionSelected: {...section} }))
                break

            default:
                break
        }
    }

    handleAddToCart(course) {
        this.props.addCourse(course)
        notification['success']({
            message: 'Course added',
            description: `${course.courseTitle} (${course.courseNo}) added successfully to the timetable`,
            duration: 3
        })
        this.props.handleClashes(this.props.coursesAdded)
        this.props.clearSearchResults()
  
    }

    checkAllReqSectionsSelected() {
        let allReqSectionsSelected = true

        if(this.state.lectureSections.length !== 0) {
            if(this.state.lectureSectionSelected === null) allReqSectionsSelected = false
        }
        if(this.state.tutorialSections.length !== 0) {
            if(this.state.tutorialSectionSelected === null) allReqSectionsSelected = false
        }
        if(this.state.practicalSections.length !== 0) {
            if(this.state.practicalSectionSelected === null) allReqSectionsSelected = false
        }

        return allReqSectionsSelected
    }


    render() {
        return (
                <Card
                    title={this.state.courseTitle}
                    extra={<p style={{fontSize: 9}}>{this.state.courseNo}</p>}
                    style={{width: 400, backgroundColor: 'white', margin: 24}}
                >
                    <div  style={{minHeight: 145}}>
                        <Collapse>

                            {(this.state.lectureSections.length===0) ? null : <Collapse.Panel
                            header='Select lecture slots'
                            key='1'>
                                <Section
                                    sections={this.state.lectureSections}
                                    handleSectionSelected={(section) => this.handleSectionSelected(section)}
                                />
                            </Collapse.Panel>}

                            {(this.state.tutorialSections.length===0) ? null : <Collapse.Panel
                            header='Select tutorial slots'
                            key='2'>
                                <Section
                                    sections={this.state.tutorialSections}
                                    handleSectionSelected={(section) => this.handleSectionSelected(section)}
                                />
                            </Collapse.Panel>}

                            {(this.state.practicalSections.length===0) ? null : <Collapse.Panel
                            header='Select practical slots'
                            key='3'>
                                <Section
                                    sections={this.state.practicalSections}
                                    handleSectionSelected={(section) => this.handleSectionSelected(section)}
                                />
                            </Collapse.Panel>}
                        </Collapse>
                        {this.state.clashExists.exists ? this.state.clashExists.reasons.map(reason => (<Alert
                            key={reason.course}
                            message={`${reason.type} with ${reason.course}`}
                            type="warning"
                            style={{marginTop: 8}}
                            showIcon
                        />)) : null}
                        {!this.checkAllReqSectionsSelected() ? <Alert
                            message="Select all required slot types from above"
                            type="info"
                            style={{marginTop: 8}}
                            showIcon
                        /> : null}
                    </div>
                    <Button
                            type='primary'
                            icon='plus'
                            onClick={() => this.handleAddToCart(this.state)}
                            disabled={this.state.clashExists.exists || !this.checkAllReqSectionsSelected()}
                            style={{marginTop: 12}}
                            >
                                {'Add to Cart'}
                     </Button>
                </Card>
        )
    }

}

const mapStateToProps = state => ({
    coursesAdded: state.coursesAdded,
    coursePool: state.coursePool
})

const mapDispatchToProps = {
    addCourse,
    handleClashes
}

export default connect(mapStateToProps, mapDispatchToProps)(Course)