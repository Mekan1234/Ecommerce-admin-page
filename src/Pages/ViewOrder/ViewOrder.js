import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./ViewOrder.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../features/auth/authSlice";
import { Link, useLocation } from "react-router-dom";
import { FaArrowDownAZ } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const ViewOrder = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = location.pathname.split("/")[3];
  useEffect(() => {
    dispatch(getOrder(orderId));
  }, []);

  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);
  const [sortedTable, setSortedTable] = useState(null);
  console.log(orderState);
  let tableData = [];
  if (sortedTable) {
    const unSortedData = [];
    for (let i = 0; i < orderState?.orderItems?.length; i++) {
      unSortedData.push({
        key: i + 1,
        name: orderState?.orderItems[i]?.product,
        brand: orderState?.orderItems[i]?.brand,
        count: orderState?.orderItems[i]?.quantity,
        amount: orderState?.orderItems[i]?.price,
        color: orderState?.orderItems[i]?.color,
      });
    }
    const copyData = unSortedData.concat();
    const sortData = copyData.sort((a, b) => {
      return a[sortedTable] > b[sortedTable] ? 1 : -1;
    });
    tableData = sortData;
  } else {
    for (let i = 0; i < orderState?.orderItems?.length; i++) {
      tableData.push({
        key: i + 1,
        name: orderState?.orderItems[i]?.product?.title,
        brand: orderState?.orderItems[i]?.product?.brand,
        count: orderState?.orderItems[i]?.quantity,
        amount: orderState?.orderItems[i]?.price,
        color: orderState?.orderItems[i]?.color?.title,
      });
    }
  }
  const [activeNumber, setActiveNumber] = useState("1");
  const pageNumbersData = [1, 2, 3, 4, 5];
  return (
    <>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>View Order</h3>
        <div className={styles.recentRowTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableTitle}>No.</th>
                <th className={styles.tableTitle}>Product Name</th>
                <th className={styles.tableTitle}>Brand</th>
                <th className={styles.tableTitle}>Count</th>
                <th className={styles.tableTitle}>Color</th>
                <th className={styles.tableTitle}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.key}</td>
                    <td>{el.name}</td>
                    <td>{el.brand}</td>
                    <td>{el.count}</td>
                    <td>{el.color}</td>
                    <td>{el.amount}</td>
                    <td>{el.action}</td>
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
    </>
  );
};

export default ViewOrder;
