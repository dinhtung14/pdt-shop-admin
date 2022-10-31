import React from 'react'
import './profile.scss'
import avatar from 'assets/image/avatar.jpg'
import { FacebookOutlined, Google } from '@mui/icons-material'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'

export default function ProfileMain() {
    return (
        <div className="row profile-container">
            <div className="col-4 col-md-12 profile-container__left">
                <div className="profile-container__left__top">
                    <img src={avatar} alt="" />
                    <h4>Minh Phuong</h4>
                    <p>minmin@gmail.com</p>
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
                                <TableCell>Minh Phuong</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Email: </TableCell>
                                <TableCell>minmin@gmail.com</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Gender: </TableCell>
                                <TableCell>Female</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Phone number: </TableCell>
                                <TableCell>0123456789</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Date of birth: </TableCell>
                                <TableCell>Jun, 16 2001</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Address: </TableCell>
                                <TableCell>Ha noi</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
