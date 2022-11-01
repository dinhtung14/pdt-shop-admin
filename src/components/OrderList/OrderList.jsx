import React, { useState } from "react";
import {
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./orderList.scss";
import { ORDER_STATUS } from "constants/gloabalUrl";
import { useEffect } from "react";
import orderApi from "api/orderApi";

export default function OrderList({ listOrder, loading }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([...listOrder]);
  }, [listOrder]);

  const getStatus = (status) => {
    let color = 'orange';
    switch (status) {
      case "Hủy":
        return color = 'red';
      case "đang giao":
        return color = 'green';
      case "Đang giao":
        return color = 'green';
      case "Giao hàng thành công":
        return color = "orange";
      case "Chờ xác nhận":
        return color = "yellow";
      default:
        color = 'black';
        break;
    }
  }

  const handleChangeStatus = async (e, index) => {
    let orderItem;
    setOrders((prev) => {
      const prevValue = [...prev]
      const newValue = { ...prevValue[index], status: e.target.value }
      prevValue[index] = newValue;
      orderItem = newValue;
      return prevValue;
    });
    if (orderItem._id) {
      const res = await orderApi.update(orderItem._id, {
        status: orderItem.status
      });
      if (res) {
        alert("Update status successfully");
      }
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
                  <TableCell>ID</TableCell>
                  <TableCell>Product name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Discount(%)</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Customer name</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((item, index) => {
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
                      <TableCell style={{ color: 'red' }}>${item?.totalAmount}</TableCell>
                      <TableCell>{item?.user?.fullname}</TableCell>
                      <TableCell
                        sx={{ color: getStatus(item.status) }}
                      >
                        <FormControl
                          margin="normal"
                          variant="outlined"
                          size="small"
                        >
                          <Select
                            defaultValue={item.status}
                            value={item.status}
                            onChange={(e) => handleChangeStatus(e, index)}
                            style={{ width: 180 }}
                          >
                            {ORDER_STATUS.map((option) => {
                              return (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
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
