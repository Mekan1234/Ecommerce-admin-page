import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Customers.module.css";
import { getUsers } from "../../features/customers/customerSlice";
import { FaArrowDownAZ } from "react-icons/fa6";

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  const [sortedTable, setSortedTable] = useState(null);
  let tableData = [];
  const customerState = useSelector((state) => state.customer.customers);
  console.log(customerState);
  if (sortedTable) {
    const unSortedData = [];
    for (let i = 0; i < customerState.length; i++) {
      if (customerState[i].role !== "admin") {
        unSortedData.push({
          key: i + 1,
          name: customerState[i].firstname + " " + customerState[i].lastname,
          email: customerState[i].email,
          mobile: customerState[i].mobile,
        });
      }
    }
    const copyData = unSortedData.concat();
    const sortData = copyData.sort((a, b) => {
      return a[sortedTable] > b[sortedTable] ? 1 : -1;
    });
    tableData = sortData;
  } else {
    for (let i = 0; i < customerState.length; i++) {
      if (customerState[i].role !== "admin") {
        tableData.push({
          key: i + 1,
          name: customerState[i].firstname + " " + customerState[i].lastname,
          email: customerState[i].email,
          mobile: customerState[i].mobile,
        });
      }
    }
  }
  const [activeNumber, setActiveNumber] = useState("1");
  const pageNumbersData = [1, 2, 3, 4, 5];
  return (
    <>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>Customers</h3>
        <div className={styles.recentRowTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableTitle}>No.</th>
                <th
                  className={
                    sortedTable
                      ? `${styles.sortTableTitleActive} ${styles.sortTableTitle}`
                      : styles.sortTableTitle
                  }
                  onClick={() =>
                    sortedTable ? setSortedTable(null) : setSortedTable("name")
                  }
                >
                  <span>Name</span>
                  <FaArrowDownAZ />
                </th>
                <th className={styles.tableTitle}>Email</th>
                <th className={styles.tableTitle}>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.key}</td>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
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

export default Customers;
