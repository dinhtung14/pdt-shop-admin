import React from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./orderList.scss";

export default function OrderList({ listOrder, loading }) {
  const getStatus = (status) => {
    let color = 'orange';
    switch (status) {
      case "Đang vận chuyển":
        return color = 'green';
      case "đang giao":
        return color = 'red';
      default:
        break;
    }
  }
  return (
    <div className="order-list">
      <h2>Orders</h2>
      <div className="order-list__detail">
        {loading ? (
          <CircularProgress size={20} />
        ) : listOrder.length === 0 ? (
          <div>No order</div>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#95afc0" }}>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Discount (%)</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Customer name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrder.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>#{index + 1}</TableCell>
                      <TableCell>
                        {item?.orderDetails.map((c, i) => {
                          return (
                            <p style={{ margin: 2 }}>{c?.product?.name}</p>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {item?.orderDetails.map((c, i) => {
                          return (
                            <p style={{ margin: 2 }}>
                              ${c?.price}x{c?.quantity}
                            </p>
                          );
                        })}
                      </TableCell>
                      <TableCell>
                        {item?.orderDetails.map((c, i) => {
                          return <p style={{ margin: 2 }}>{c?.discount}</p>;
                        })}
                      </TableCell>
                      <TableCell>{item?.address}</TableCell>
                      <TableCell>{item?.phoneNumber}</TableCell>
                      <TableCell>$ {item?.totalAmount}</TableCell>
                      <TableCell>{item?.user?.fullname}</TableCell>
                      <TableCell
                        sx={{ color: getStatus(item.status) }}
                      >
                        {item?.status ? item.status : "Chờ xác nhận"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </div>
  );
}
