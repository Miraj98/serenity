import React from 'react'
import  { Drawer, Icon, Button } from 'antd'
import { connect } from 'react-redux'
import { deleteCourse } from '../../redux/actions'
import store from '../../redux/store';


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

    render() {
        return (
            <div>
                <Button type='primary' onClick={() => this.showDrawer()} >
               
                    <span><Icon type="shopping-cart" /></span><span style={{marginLeft: '0.5em'}}>My Cart</span>
        
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
    coursesAdded: state.coursesAdded
})

export default connect(mapStateToProps)(Sidebar)