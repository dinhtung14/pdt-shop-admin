import React from 'react'
import statusCard from 'assets/fakeData/statusCard'
import StatusCard from 'components/StatusCard/StatusCard'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TableCell, TableRow } from '@mui/material'
import { dataCharts } from 'assets/fakeData/chartsData';

const renderOrderHead = (item, index) => {
    return (
        <TableCell style={{ fontWeight: 600 }} key={index}>{item}</TableCell>
    )
};

const renderOrderBody = (item, index) => {
    return (
        <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.payment}</TableCell>
            <TableCell>{item.status}</TableCell>
        </TableRow>
    )
};

const renderProductCardHead = (item, index) => {
    return (
        <TableCell style={{ fontWeight: 600 }} key={index}>{item}</TableCell>
    )
}

const renderProductCardBody = (item, index) => {
    const success = item.status === 'Success' ? (
        <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell style={{color: '#019707'}}>{item.status}</TableCell>
            <TableCell>{item.price}</TableCell>
        </TableRow>
    ) : item.status === 'Pending' ? 
    (
        <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell style={{color: '#fb0b12'}}>{item.status}</TableCell>
            <TableCell>{item.price}</TableCell>
        </TableRow>
    ) : (
        <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell style={{color: '#d68102'}}>{item.status}</TableCell>
            <TableCell>{item.price}</TableCell>
        </TableRow>
        )
    
    return success;
};

export default function Dashboard() {
    return (
        <div className="dashboard">
            <h2 style={{ marginBottom: '20px' }}>Dashboard</h2>
            <div className="row">
                {
                    statusCard.map((item, index) => {
                        return (
                            <div className="col-4 col-md-6" key={index}>
                                <StatusCard
                                    card={item}
                                />
                            </div>
                        )
                    })
                }
            </div>

            <div className="row">
                <div className="col-6 col-md-12">
                    <BarChart
                        width={600}
                        height={450}
                        data={dataCharts}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 0,
                            bottom: 5
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="storeCustomers" fill="#8884d8"/>
                        <Bar dataKey="onlineCustomers" fill="#82ca9d"/>
                    </BarChart>
                    
                </div>
                {/* <div className="col-6 col-md-12">
                    <Table
                        title="Latest Orders"
                        limit="5"
                        headData={latestOrders.header}
                        renderHead={(item, index) => renderOrderHead(item, index)}
                        bodyData={latestOrders.body}
                        renderBody={(item, index) => renderOrderBody(item, index)}
                    />
                </div> */}
            </div>

            {/* <div className="row" style={{margin: '20px 0'}}>
                <div className="col-6 col-md-12">
                    <Table
                        title="Product Cart"
                        headData={productCard.header}
                        renderHead={(item, index) => renderProductCardHead(item, index)}
                        bodyData={productCard.body}
                        renderBody={(item, index) => renderProductCardBody(item, index)}
                    />
                </div>
                <div className="col-6 col-md-12">
                    <Employee/>
                </div>
            </div> */}
        </div>
    )
}
