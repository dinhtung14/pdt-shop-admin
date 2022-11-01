import React from 'react'
import './profile.scss'
import avatar from 'assets/image/avatar.jpg'
import { FacebookOutlined, Google } from '@mui/icons-material'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import authApi from 'api/authApi'

export default function ProfileMain() {
    const [user, setUser] = useState();

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await authApi.getInfo();
                setUser(res.user);
            } catch (error) {
                return;
            }
        }
        getUser();
    }, [])
    
    return (
        <div className="row profile-container">
            <div className="col-4 col-md-12 profile-container__left">
                <div className="profile-container__left__top">
                    <img src={avatar} alt="" />
                    <h4>{user?.username}</h4>
                    <p>{user?.email}</p>
                    <div className="user-social">
                        <FacebookOutlined className="fb-icon"/>
                        <Google className="gg-icon"/>
                    </div>
                </div>
                <hr />
                <div className="profile-container__left__bottom">
                    <h4>Employee Status</h4>
                    <div className="user-status">
                        <h5>Performance <span>80%</span></h5>
                        <div className="user-status__item">
                            <div style={{width: '80%', backgroundColor: '#ff8084'}}></div>
                        </div>
                    </div>
                    <div className="user-status">
                        <h5>Overtime <span>60%</span></h5>
                        <div className="user-status__item">
                            <div style={{width: '60%', backgroundColor: '#38ada9'}}></div>
                        </div>
                    </div>
                    <div className="user-status">
                        <h5>Bonus <span>30%</span></h5>
                        <div className="user-status__item">
                            <div style={{width: '30%', backgroundColor: '#888888'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-8 col-md-12 profile-container__right">
                <h3>Profile</h3>
                <div className="profile-container__right__main">
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Fullname: </TableCell>
                                <TableCell>{user.fullname ? user.fullname : "-"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email: </TableCell>
                                <TableCell>{user.email ? user.email : "-"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Phone number: </TableCell>
                                <TableCell>{user.phoneNumber ? user.phoneNumber : "-"}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Address: </TableCell>
                                <TableCell>{user.address ? user.address : "-"}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
