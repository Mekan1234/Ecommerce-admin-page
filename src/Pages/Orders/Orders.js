import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./Orders.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrders, updateAnOrder } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import { FaArrowDownAZ } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const [sortedTable, setSortedTable] = useState(null);

  let tableData = [];
  if (sortedTable) {
    const unSortedData = [];
    for (let i = 0; i < orderState?.length; i++) {
      unSortedData.push({
        key: i + 1,
        name: orderState[i]?.user?.firstname,
        product: (
          <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>
        ),
        amount: orderState[i]?.totalPrice,
        date: new Date(orderState[i].createdAt).toLocaleString(),
        action: (
          <>
            <select name="" className="form-control form-select" id="">
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </>
        ),
      });
    }
    const copyData = unSortedData.concat();
    const sortData = copyData.sort((a, b) => {
      return a[sortedTable] > b[sortedTable] ? 1 : -1;
    });
    tableData = sortData;
  } else {
    for (let i = 0; i < orderState?.length; i++) {
      tableData.push({
        key: i + 1,
        name: orderState[i]?.user?.firstname,
        product: (
          <Link to={`/admin/order/${orderState[i]?._id}`}>View Orders</Link>
        ),
        amount: orderState[i]?.totalPrice,
        date: new Date(orderState[i]?.createdAt).toLocaleString(),
        action: (
          <>
            <select
              name=""
              onChange={(e) =>
                updateOrderStatus(orderState[i]?._id, e.target.value)
              }
              defaultValue={orderState[i]?.orderStatus}
              className="form-control form-select"
              id=""
            >
              <option value="Ordered" disabled selected>
                Ordered
              </option>
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </>
        ),
      });
    }
  }
  const updateOrderStatus = (a, b) => {
    dispatch(updateAnOrder({ id: a, status: b }));
  };
  const [activeNumber, setActiveNumber] = useState("1");
  const pageNumbersData = [1, 2, 3, 4, 5];
  return (
    <>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>Orders</h3>
        <div className={styles.recentRowTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableTitle}>No.</th>
                <th className={styles.tableTitle}>Name</th>
                <th className={styles.tableTitle}>Products</th>
                <th className={styles.tableTitle}>Amount</th>
                <th className={styles.tableTitle}>Date</th>
                <th className={styles.tableTitle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.key}</td>
                    <td>{el.name}</td>
                    <td>{el.product}</td>
                    <td>{el.amount}</td>
                    <td>{el.date}</td>
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

export default Orders;
