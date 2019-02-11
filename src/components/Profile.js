import React from 'react'

const Profile = (props) => (
    <div className="profile">
        <div className="userdata">
            <img src={props.userInfo.avatar_url}/>
            <div className="user-setting">
                <span className="username"> {props.userInfo.name} </span>
                <span className="userspecs"> {props.userInfo.bio} </span>
            </div>
        </div>
    </div>
)

export default Profile;