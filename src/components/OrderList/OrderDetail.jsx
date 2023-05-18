import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import orderApi from "../../api/orderApi";
import { useHistory, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import "./orderDetail.scss";

const initialOrder = {
  _id: "",
  id: "",
  note: "",
  status: 1,
  paymentStatus: 1,
  payment_method: "",
  coupon: [],
  address: "",
  phone: "",
  total_amount: 0,
  user: {
    email: "",
    password: "",
    role: "",
    fullname: "",
    address: "",
    phone: "",
  },
  order_details: [
    {
      _id: "",
      id: "",
      discount: 0,
      order: "",
      quantity: 0,
      price: 0,
      amount: 0,
      product_version: {
        _id: "",
        quantity: 0,
        price: 0,
        sale_price: 0,
        product: {
          _id: "",
          images: [],
          discount: 0,
          sold: 0,
          deleted: 0,
          product_name: "",
          description: "",
          specification: "",
          category: {
            name: "",
            logo: "",
            slug: "",
          },
          slug: "",
          price: 0,
        },
        storage: {
          name: "",
        },
        color: {
          name: "",
        },
      },
    },
  ],
  createdAt: "",
  updatedAt: "",
};

export default function OrderDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [order, setOrder] = useState(initialOrder);
  const [isLoading, setisLoading] = useState(false);

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
	
  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const response = await orderApi.getOrderDetail(id);
        console.log(response);
        if (response.success) {
          setOrder(response.data);
        }

        setisLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [id]);

  const body = isLoading ? (
    <CircularProgress />
  ) : !order ? (
    <div>Your order does not exist.</div>
  ) : (
    <div className="order-detail">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <IconButton
          size="medium"
          onClick={() => history.goBack()}
        >
          <ArrowBack fontSize="inherit" />
        </IconButton>
        <p style={{ paddingLeft: 5 }}>Order detail</p>
      </Box>

      <Table component={Paper} sx={{ mt: 2 }}>
        <Grid container>
          <Grid item lg={5}>
            <Box
              sx={{
                padding: "15px",
                mr: 2,
                borderRight: "1px solid #ccc",
                height: "100%",
              }}
            >
              <div className="order-item__info">
                <p>Fullname: </p>
                <p>{order.user.fullname}</p>
              </div>
              <div className="order-item__info">
                <p>Email: </p>
                <p>{order.user.email}</p>
              </div>
              <div className="order-item__info">
                <p>Phone: </p>
                <p>{order.user.phoneNumber}</p>
              </div>
              <div className="order-item__info">
                <p>Address: </p>
                <p>{order.address}</p>
              </div>
              <div className="order-item__info">
                <p>Node: </p>
                <p>{order.note}</p>
              </div>
              <div className="order-item__info">
                <p>Order status: </p>
                <p>{getStatus(order.status)}</p>
              </div>
              <div className="order-item__info">
                <p>Payment status: </p>
                <p>
                  {order.paymentStatus === Number(1) ? "Unpaid" : order.paymentStatus === Number(2) ? "Paid" : ""}
                </p>
              </div>
            </Box>
          </Grid>
          <Grid item lg={7}>
            {order?.orderDetails
              ? order?.orderDetails.map((item) => {
                  const price =
                    item.quantity *
                    (item.price - (item.price * item.discount) / 100);

                  return (
                    <div key={item._id} className="order-detail-item">
                      <div className="order-detail-item__img">
                        <img
                          src={item.product.listImage[0]}
                          alt=""
                        />
                      </div>
                      <div className="order-detail-item__info">
                        <p>{item.product.name}</p>
                        <p className="order-detail-item__info__price">
                          ${price} x {item.quantity}
                        </p>
                      </div>
                    </div>
                  );
                })
              : ""}

            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4}>Total</TableCell>
                  <TableCell>
                    ${order.totalAmount ? order.totalAmount : ""}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Fee shipping</TableCell>
                  <TableCell>${(1)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Payment status</TableCell>
                  <TableCell colSpan={4}>
                    {order.payment_method === "onPaypal"
                      ? "Payment with Paypal"
                      : "Payment on delivery"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={4}>Total money</TableCell>
                  <TableCell>
                    ${order.totalAmount
                      ? order.totalAmount + 1
                      : ""}
                  </TableCell>
                </TableRow>
              </TableBody>
            </div>
          </Grid>
        </Grid>
      </Table>
    </div>
  );

  return body;
}
