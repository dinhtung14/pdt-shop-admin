import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./orderList.scss";
import { ORDER_STATUS, ORDER_STATUS_PAYMENT } from "constants/gloabalUrl";
import { useEffect } from "react";
import orderApi from "api/orderApi";
import EditForm from "components/EditForm/EditForm";
import { TimeFormat } from "utils/time";
import { useHistory } from "react-router-dom";
import { ArrowRightAlt } from "@mui/icons-material";

export default function OrderList({ listOrder, loading }) {
  const history = useHistory();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders([...listOrder]);
  }, [listOrder]);

  const getColorStatus = (status) => {
    let color = "";
    let bgcColor = "";
    switch (status) {
      case "1":
        color = "#0f3460";
        bgcColor = "rgb(230, 230, 230)";
        break;
      case "2":
        color = "rgb(240, 140, 46)";
        bgcColor = "rgb(241, 200, 162)";
        break;
      case "3":
        color = "rgb(3, 184, 175)";
        bgcColor = "rgb(213, 241, 240)";
        break;
      case "4":
        color = "#f142d1";
        bgcColor = "#b6a2b2";
        break;
      case "5":
        color = "#33d067";
        bgcColor = "rgb(181, 246, 219)";
        break;
      case "6":
        color = "red";
        bgcColor = "rgb(247, 128, 122)";
        break;
      default:
        color = "#0f3460";
        bgcColor = "#ccc";
        break;
    }
    return { color, bgcColor };
  };

  const getStatus = (status) => {
    let content = "";
    switch (status) {
      case "1":
        content = "Order success";
        break;
      case "2":
        content = "Confirmed";
        break;
      case "3":
        content = "Preparing goods";
        break;
      case "4":
        content = "Delivering";
        break;
      case "5":
        content = "Successful delivery";
        break;
      case "6":
        content = "Canceled";
        break;
      default:
        content = "Confirmed";
        break;
    }
    return content;
  };

  const getColorStatusPayment = (statusPayment) => {
    let color = "";
    let bgcColor = "";
    switch (statusPayment) {
      case 1:
        color = "#bc8504";
        bgcColor = "rgb(241, 200, 162)";
        break;
      case 2:
        color = "#107c0e";
        bgcColor = "rgb(181, 246, 219)";
        break;
      default:
        color = "#bc8504";
        bgcColor = "rgb(241, 200, 162)";
        break;
    }
    return { color, bgcColor };
  };

  const getStatusPayment = (statusPayment) => {
    let content = "";
    switch (statusPayment) {
      case 1:
        content = "Unpaid";
        break;
      case 2:
        content = "Paid";
        break;
      default:
        content = "Unpaid";
        break;
    }
    return content;
  };

  const handleChangeStatus = async (index, value) => {
    let orderItem;
    setOrders((prev) => {
      const prevValue = [...prev];
      const newValue = { ...prevValue[index], status: value };
      prevValue[index] = newValue;
      orderItem = newValue;
      return prevValue;
    });
    if (orderItem._id) {
      const res = await orderApi.update(orderItem._id, {
        status: String(orderItem.status),
      });
      if (res) {
        alert("Update status successfully");
      }
    }
  };

  const handleChangeStatusPayment = async (index, value) => {
    let orderItem;
    setOrders((prev) => {
      const prevValue = [...prev];
      const newValue = { ...prevValue[index], paymentStatus: value };
      prevValue[index] = newValue;
      orderItem = newValue;
      return prevValue;
    });
    if (orderItem._id) {
      const res = await orderApi.update(orderItem._id, {
        paymentStatus: orderItem.paymentStatus,
      });
      if (res) {
        alert("Update payment status successfully");
      }
    }
  };

  return (
    <div className="order-list">
      <h2>Orders</h2>
      <div className="order-list__detail">
        {loading ? (
          <CircularProgress size={20} />
        ) : listOrder.length === 0 ? (
          <div>No order</div>
        ) : (
          <Box
            sx={{
              flex: 6,
              width: "100%",
              maxWidth: "1230px",
              height: "100vh",
              maxHeight: "70vh",
              overflowX: "auto",
              overflowY: "auto",
            }}
          >
            <TableContainer sx={{ minWidth: 1200 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow style={{ backgroundColor: "#95afc0" }}>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Payment Status</TableCell>
                    <TableCell>Order time</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>#{item?._id.slice(0, 8)}</TableCell>
                        <TableCell>{item?.user?.fullname}</TableCell>
                        <TableCell>{item?.user?.phoneNumber}</TableCell>
                        <TableCell sx={{ maxWidth: "200px" }}>{item?.address}</TableCell>
                        <TableCell style={{ color: "red" }}>
                          ${(item?.totalAmount)}
                        </TableCell>
                        <TableCell>
                          <EditForm
                            index={index}
                            name="status"
                            value={item.status}
                            setValue={handleChangeStatus}
                            status={getStatus(item.status)}
                            options={ORDER_STATUS}
                            styles={{
                              backgroundColor: getColorStatus(item.status)
                                .bgcColor,
                              color: getColorStatus(item.status).color,
                              textAlign: "center",
                              borderRadius: 5,
                              padding: "3px 8px",
                              display: "inline-block",
                              fontSize: "12px",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <EditForm
                            index={index}
                            name="statusPayment"
                            value={item.paymentStatus}
                            setValue={handleChangeStatusPayment}
                            status={getStatusPayment(item.paymentStatus)}
                            options={ORDER_STATUS_PAYMENT}
                            styles={{
                              backgroundColor: getColorStatusPayment(
                                item.paymentStatus
                              ).bgcColor,
                              color: getColorStatusPayment(item.paymentStatus)
                                .color,
                              textAlign: "center",
                              borderRadius: 5,
                              padding: "3px 8px",
                              display: "inline-block",
                              fontSize: "12px",
                              cursor: "pointer",
                            }}
                          />
                        </TableCell>
                        <TableCell>{TimeFormat(item?.createdAt)}</TableCell>
                        <TableCell>
                          <ArrowRightAlt
                            sx={{ cursor: 'pointer' }}
                            onClick={() =>
                              history.push(
                                `/orders/order-detail/${item._id}`
                              )
                            }
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </div>
    </div>
  );
}
