import React from 'react'
import Sidebar from './HeaderButtons'
import { connect } from 'react-redux'
import { Input } from 'antd'
import { getSearchResults } from './getSearchResults'
import { addSearchResults } from '../../redux/actions'

class Header extends React.Component {

    handleSearch(input) {
        let results = getSearchResults(input, this.props.coursePool)
        this.props.addSearchResults(results)
    }

    render() {
        return (
            <div style={
                {
                    display: 'flex',
                    paddingBottom: '0.6em',
                    paddingTop: '0.6em',
                    alignItems: 'center',
                    borderBottomStyle:'solid',
                    borderBottomWidth: '0.125em',
                    borderBottomColor: '#eee',
                    justifyContent: 'space-around'
                }
            }>
                <div style={{fontSize: '1.5em'}}><b>SERENITY</b></div>
                <Input.Search
                    placeholder='Search courses'
                    style={{width: '50em'}}
                    size='large'
                    enterButton
                    onChange={({ target }) => this.handleSearch(target.value)}
                />
                <Sidebar/>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
    coursePool: state.coursePool
})

const mapDispatchToProps = {
    addSearchResults
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)