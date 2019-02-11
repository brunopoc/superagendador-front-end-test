import React, { Component } from 'react'
import Header from './Header'
import Profile from './Profile'
import Main from './Main'
import axios from 'axios'

class App extends Component {
    state = {
        userInfo:{}
    }

    componentDidMount(){
        this.loadRepos();
    }

    loadRepos = async () => {
        const info = await axios.get('https://api.github.com/users/brunopoc');
        this.setState({
            userInfo : {
                ...this.state.userInfo,
                info : info.data
            }
        })

        const repos = await axios.get('https://api.github.com/users/brunopoc/repos');
        this.setState({
            userInfo : {
                ...this.state.userInfo,
                repos : repos.data
            }
        })

        const starred = await axios.get('https://api.github.com/users/brunopoc/starred');
        this.setState({
            userInfo : {
                ...this.state.userInfo,
                starred : starred.data
            }
        })

        
    }

    

    render() {
        const { userInfo } = this.state
        return (
            <div className="App">
                <Header />
                <div className="section">
                    { userInfo.info ? <Profile userInfo={userInfo.info} /> : null}
                    { userInfo.repos ? <Main repos={userInfo.repos} starred={userInfo.starred} /> : null}   
                </div>
            </div>
        );
    }
}

export default App;
