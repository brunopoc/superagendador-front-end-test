import React, { Component } from 'react'
import Tabs from './Tabs'
import axios from 'axios';

export default class Main extends Component {
    state = {
        repos : [],
        starred: [],
        errstarred: '',
        errrepo: ''
    }

    handleKeyforRepos = (e) => {
        if(e.key === "Backspace" && e.target.value.length === 1){
            this.setState({
                ... this.state,
                repos: []
            })
        }
        if(e.key === "Enter"){
            axios.get('https://api.github.com/repos/brunopoc/' + e.target.value)
            .then (result => {
                this.setState({
                    ...this.state,
                    repos: [ result.data ]
                })
            }).catch(err => {
                this.setState({
                    ...this.state,
                    errrepo : "Nenhum repositório encontrado"
                })
            })
        }
    }

    handleKeyforStarred = (e) => {
        if(e.key === "Backspace" && e.target.value.length === 1){
            this.setState({
                ... this.state,
                starred: []
            })
        }
        if(e.key === "Enter"){
            for(let i = 0; i < this.props.starred.length; i++){
                if(e.target.value.toLowerCase() === this.props.starred[i].name.toLowerCase() || e.target.value.toLowerCase() === this.props.starred[i].owner.login.toLowerCase() ){
                    this.setState({
                        ... this.state,
                        starred: [ this.props.starred[i] ]
                    })
                }
            }
        }
    }

    render(){
        let repos = this.state.repos.length != 0 ? this.state.repos : this.props.repos;
        let starred = this.state.starred.length != 0 ? this.state.starred : this.props.starred; 
        let reposLength = repos ?  repos.length : 0;     
        let starredLength = starred ?  starred.length : 0;     
        const ico = "< >"

        return(
            <div className="main-section">
                <Tabs>
                        <div label="Repos" totalOf = {reposLength} > 
                        <input type="text" onKeyDown={this.handleKeyforRepos} placeholder="Filter by name" />
                        <ul>
                            {repos.map(item => {
                                return(
                                    <li key={item.name}>
                                        <h3><a href={item.html_url}>{item.name}</a></h3>
                                        <p> {item.description} </p>
                                        <span id="ico">{ico}</span>  <span>{item.language}</span>
                                        <span> <img src="./img/stars.png" /> {item.forks}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div label="Starred" totalOf = {starredLength}>
                        <input type="text" onKeyDown={this.handleKeyforStarred} placeholder="Filter by name" />
                        <ul>
                            {starred ? 
                                starred.map(item => {
                                    return(
                                        <li key={item.name}>
                                            <h3><a href={item.html_url}> <span> {item.owner.login} /</span>  {item.name} </a> </h3>
                                            <p> {item.description} </p>
                                            <span><img src="./img/stars.png" /> {item.stargazers_count}</span>
                                            <span><img src="./img/forks.png" /> {item.forks}</span>
                                        </li>
                                    )
                                })
                                :
                                null
                            }
                        </ul>
                    </div>
                </Tabs>
            </div>
        )
    }
}