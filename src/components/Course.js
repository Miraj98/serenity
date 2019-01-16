import React from 'react';
import { Button, Card, Collapse } from 'antd';
import Section from './Section';
import store from '../redux/store';
import { addCourse } from '../redux/actions';


export default class Course extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            courseTitle: this.props.courseTitle,
            courseNo: this.props.courseNo,
            comCode: this.props.comCode,
            credits: [...this.props.credits],
            instructorInCharge: this.props.ic,
            compreDate: this.props.compreDate,
            lectureSections: [...this.props.lectureSections],
            tutorialSections: [...this.props.tutorialSections],
            practicalSections: [...this.props.practicalSections],
            lectureSectionSelected: null,
            practicalSectionSelected: null,
            tutorialSectionSelected: null
        }
    }

    handleSectionSelected(section) {
        switch(section.type) {

            case "Lecture":
                this.setState(() => ({ lectureSectionSelected: {...section} }), () => console.log(this.state.lectureSectionSelected))
                break
            
            case "Practical":
                this.setState(() => ({ practicalSectionSelected: {...section} }), () => console.log(this.state.practicalSectionSelected))
                break

            case "Tutorial":
                this.setState(() => ({ tutorialSectionSelected: {...section} }), () => console.log(this.state.tutorialSectionSelected))
                break

            default:
                break
        }
    }

    handleAddToCart(course) {
        store.dispatch(addCourse(course))
    }

    render() {
        return (
            // <div style={{display: 'flex', margin: 24}}>
                <Card
                    title={this.state.courseTitle}
                    extra={<p style={{fontSize: 9}}>{this.state.courseNo}</p>}
                    actions={
                        [<Button
                            type='primary'
                            icon='plus'
                            onClick={() => this.handleAddToCart(this.state)}
                            >
                                Add to cart
                            </Button>]
                    }
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
                    </div>
                </Card>
            // </div>
        )
    }

}