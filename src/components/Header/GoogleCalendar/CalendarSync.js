import React from 'react'
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'

const CalendarSync = props => (
    <Button onClick={props.onClick()}>
        <span><Icon type="google" theme="outlined" style={{fontSize: 18}}/></span><span style={{marginLeft: '0.5em'}}>{props.isSignedIn ? `Sync with Google calendar` : `Sign In`}</span>
    </Button>
)

const mapStateToProps = state => ({
    isSignedIn: state.isSignedIn
})

export default connect(mapStateToProps)(CalendarSync)