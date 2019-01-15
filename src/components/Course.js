import React from 'react';
import { Button, Card, Collapse } from 'antd';
import Section from './Section';


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
            practicalSections: [...this.props.practicalSections]
        }
    }

    render() {
        return (
            <div style={{display: 'flex', width: 400, margin: 24}}>
                <Card
                    title={this.state.courseTitle}
                    extra={<p style={{fontSize: 9}}>{this.state.courseNo}</p>}
                    actions={[<Button type='primary' icon='plus'>Add to cart</Button>]}
                    style={{flex: 1, backgroundColor: 'white'}}
                >
                    <div  style={{minHeight: 145}}>
                        <Collapse>

                            {(this.state.lectureSections.length===0) ? null : <Collapse.Panel
                            header='Select lecture slots'
                            key='1'>
                                <Section sections={this.state.lectureSections} />
                            </Collapse.Panel>}

                            {(this.state.tutorialSections.length===0) ? null : <Collapse.Panel
                            header='Select tutorial slots'
                            key='2'>
                                <Section sections={this.state.tutorialSections} />
                            </Collapse.Panel>}

                            {(this.state.practicalSections.length===0) ? null : <Collapse.Panel
                            header='Select practical slots'
                            key='3'>
                                <Section sections={this.state.practicalSections} />
                            </Collapse.Panel>}

                        </Collapse>
                    </div>
                </Card>
            </div>
        )
    }

}