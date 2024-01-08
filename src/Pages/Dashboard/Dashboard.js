import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsArrowDownRight, BsArrowUpLeft } from "react-icons/bs";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from "../../features/auth/authSlice";
const Dashboard = () => {
  const getUserFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getUserFromLocalStorage !== null ? getUserFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlyDataSales, setMonthlyDataSales] = useState([]);
  const [orderData, setOrderData] = useState([]);
  console.log("begin");
  useEffect(() => {
    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
  }, []);
  useEffect(() => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let i = 0; i < monthlyDataState?.length; i++) {
      const element = monthlyDataState[i];
      data.push({
        month: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        month: monthNames[element?._id?.month],
        value: element?.count,
      });
    }
    setMonthlyData(data);
    setMonthlyDataSales(monthlyOrderCount);
    let data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i,
        name: orderState[i].user.firstname + " " + orderState[i].user.lastname,
        product: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        afterPrice: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });
    }
    setOrderData(data1);
  }, [monthlyDataState, yearlyDataState, orderState]);

  const [activeNumber, setActiveNumber] = useState("1");

  const pageNumbersData = [1, 2, 3, 4, 5];
  Chart.register(...registerables);
  const chartData = {
    labels: monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "",
        data: monthlyData.map((item) => item.income),
        backgroundColor: ["#ffd333"],
        borderColor: "#000",
        fill: "#FFFFFF",
        hoverBackgroundColor: "#ccc",
        // borderWidth: 2,
      },
    ],
  };
  const chartDataSales = {
    labels: monthlyDataSales.map((item) => item.month),
    datasets: [
      {
        label: "",
        data: monthlyDataSales.map((item) => item.value),
        backgroundColor: ["#ffd333"],
        borderColor: "#000",
        fill: "#FFFFFF",
        hoverBackgroundColor: "#ccc",
        // borderWidth: 2,
      },
    ],
  };
  return (
    <div className={styles.dashboardWrapper}>
      <h3 className={styles.dashboardTitle}>Dashboard</h3>
      <div className={styles.dashboardCards}>
        <div className={styles.dashboardCart}>
          <div className={styles.cartLeftElements}>
            <p className={styles.desc}>Total Income</p>
            <h4 className={styles.subTitle}>
              $ {yearlyDataState && yearlyDataState[0]?.amount}
            </h4>
          </div>
          <div className={styles.cardRightElements}>
            <p className={styles.desc}>Income in Last Year from Today</p>
          </div>
        </div>
        <div className={styles.dashboardCart}>
          <div className={styles.cartLeftElements}>
            <p className={styles.desc}>Total Sales</p>
            <h4 className={styles.subTitle}>
              {yearlyDataState && yearlyDataState[0]?.count}
            </h4>
          </div>
          <div className={styles.cardRightElements}>
            <p className={styles.desc}>Sales in Last Year from Today</p>
          </div>
        </div>
      </div>
      <div className={styles.charts}>
        <div className={styles.dashboardBarChart}>
          <h3 className={styles.title}>Income Statics</h3>
          <div className={styles.dashboardBar}>
            <Bar
              data={chartData}
              options={{
                plugins: {
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className={styles.dashboardBarChart}>
          <h3 className={styles.title}>Sales Statics</h3>
          <div className={styles.dashboardBar}>
            <Bar
              data={chartDataSales}
              options={{
                plugins: {
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>Recent Orders</h3>
        <div className={styles.recentRowTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableTitle}>No.</th>
                <th className={styles.tableTitle}>Name</th>
                <th className={styles.tableTitle}>Product Count</th>
                <th className={styles.tableTitle}>Total Price</th>
                <th className={styles.tableTitle}>
                  Total Price After Discount
                </th>
                <th className={styles.tableTitle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.key}</td>
                    <td>{el.name}</td>
                    <td>{el.product}</td>
                    <td>{el.price}</td>
                    <td>{el.afterPrice}</td>
                    <td>{el.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.page}>
            <div className={styles.pageIcon}>
              <IoIosArrowBack />
            </div>
            <div className={styles.pageNumbers}>
              {pageNumbersData.map((number, index) => {
                return (
                  <span
                    id={index + 1}
                    key={index}
                    className={
                      activeNumber === String(number)
                        ? `${styles.pageNumber} ${styles.activeNumber}`
                        : styles.pageNumber
                    }
                    onClick={(e) => {
                      setActiveNumber(e.currentTarget.id);
                      console.log(e.currentTarget.id);
                    }}
                  >
                    {number}
                  </span>
                );
              })}
            </div>
            <div className={styles.pageIcon}>
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
