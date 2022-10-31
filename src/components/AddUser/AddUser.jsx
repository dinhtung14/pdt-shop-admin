import React from 'react'
import { Box, TextField } from '@mui/material'
import './addUser.scss'

export default function AddUser() {
    return (
        <div className="add-user">
            <h2>create user</h2>
            <div className="add-user__main">
                <h3>Add User</h3>
                <div className="add-user__main__content">
                    <Box>
                        <div className="field-item">
                            <p>Username <span>*</span></p>
                            <TextField fullWidth variant="outlined" type="text" label="Username" size="small"/>
                        </div>
                        <div className="field-item">
                            <p>Email <span>*</span></p>
                            <TextField fullWidth variant="outlined" type="email" label="Email" size="small"/>
                        </div>
                        <div className="field-item">
                            <p>Fullname</p>
                            <TextField fullWidth variant="outlined" type="text" label="Fullname" size="small"/>
                        </div>
                        <div className="field-item">
                            <p>Password <span>*</span></p>
                            <TextField fullWidth variant="outlined" type="password" label="Password" size="small"/>
                        </div>
                        <div className="field-item">
                            <p>Confirm password <span>*</span></p>
                            <TextField fullWidth variant="outlined" type="password" label="Confirm password" size="small"/>
                        </div>
                    </Box>
                </div>
                <div className="save-btn">
                    save
                </div>
            </div>
        </div>
    )
}
