import React from 'react'
import Sidebar from './Sidebar'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { getSearchResults } from './getSearchResults'
import store from '../redux/store'
import { addSearchResults } from '../redux/actions'

class Header extends React.Component {

    handleSearch(input) {
        let results = getSearchResults(input, this.props.coursePool)
        store.dispatch(addSearchResults(results))
    }

    render() {
        return (
            <div style={
                {
                    display: 'flex',
                    paddingBottom: 10,
                    paddingTop: 10,
                    alignItems: 'center',
                    borderBottomStyle:'solid',
                    borderBottomWidth: 2,
                    borderBottomColor: '#eee',
                    justifyContent: 'space-around'
                }
            }>
                <div style={{fontSize: 24}}><b>SERENITY</b></div>
                <Input.Search
                    placeholder='Search courses...'
                    style={{width: 500}}
                    size='large'
                    enterButton
                    onChange={({ target }) => this.handleSearch(target.value)}
                />
                <Sidebar />
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    coursePool: state.coursePool
})

export default connect(mapStateToProps)(Header)