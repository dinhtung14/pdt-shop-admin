import React from 'react'
import './topnav.scss'
import {Search, NotificationsNone, ColorLens, Menu } from '@mui/icons-material'
import Dropdown from 'components/Dropdown/Dropdown'
import avatar from 'assets/image/avatar.jpg'
import { notice_menu, user_menu } from 'assets/fakeData/dropdown'
import { Link } from 'react-router-dom'

const renderUserToggle = () => {
    return (
        <div className="user">
            <img src={avatar} alt="" style={{width: '40px', height: '40px', borderRadius: '50%'}}/>
        </div>
    )
}

const renderNoticeItem = (item, index) => {
    return (
        <Link className="render-item" key={index}>
            <span className="render-item__icon">{item.icon}</span>
            <span>{item.content}</span>
        </Link>
    )
}

const renderUserMenu = (item,index) => {
    return (
        <Link to={item.route} className="render-item" key={index}>
            <span className="render-item__icon">{item.icon}</span>
            <span>{item.content}</span>
        </Link>
    )
}

export default function Topnav({ toggle }) {

    return (
        <div className="topnav">
            <div className="topnav-left">
                <h1>
                    <Link to="/">
                        Sober Shop
                    </Link>
                </h1>
                <div className="topnav-left__toggle" onClick={toggle}>
                    <Menu/>
                </div>
            </div>

            <div className="topnav-right">
                <div className="topnav-right__item">
                    <div className="topnav-right__search">
                        <Search className="search-icon"/>
                        <input type="text" placeholder="Search..."/>
                    </div>
                </div>
                
                <div className="topnav-right__item">
                    {/* <Badge badgeContent={6} color="success">
                        <NotificationsNone />
                    </Badge> */}
                    <Dropdown
                        icon={<NotificationsNone />}
                        badge="6"
                        contentData={notice_menu}
                        renderItem={(item, index) => renderNoticeItem(item, index)}
                        renderFooter={() => <Link to="/">View all</Link>}
                    />
                    
                </div>
                <div className="topnav-right__item">
                    <ColorLens />
                </div>
                <div className="topnav-right__item">
                    <Dropdown
                        customToggle={() => renderUserToggle()}
                        contentData={user_menu}
                        renderItem={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
        
            </div>
        </div>
    )
}
