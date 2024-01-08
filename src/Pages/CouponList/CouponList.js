import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./CouponList.module.css";
import { FaArrowDownAZ } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { deleteACoupon, getAllCoupons, resetState } from "../../features/coupon/couponSlice";
import CustomModal from "../../Components/CustomModal/CustomModal";
const CouponList = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setCouponId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getAllCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);

  const [sortedTable, setSortedTable] = useState(null);

  let tableData = [];
  if (sortedTable) {
    const unSortedData = [];
    for (let i = 0; i < couponState.length; i++) {
      unSortedData.push({
        key: i + 1,
        name: couponState[i].name,
        discount: couponState[i].discount,
        expiry: new Date(couponState[i].expiry).toLocaleString(),
        action: (
          <>
            <Link to={`/admin/coupon/${couponState[i]._id}`} className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(couponState[i]._id)}
            >
              <MdDelete />
            </button>
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
    for (let i = 0; i < couponState.length; i++) {
      tableData.push({
        key: i + 1,
        name: couponState[i].name,
        discount: couponState[i].discount,
        expiry: new Date(couponState[i].expiry).toLocaleString(),
        action: (
          <>
            <Link to={`/admin/coupon/${couponState[i]._id}`} className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(couponState[i]._id)}
            >
              <MdDelete />
            </button>
          </>
        ),
      });
    }
  }

    const deleteCoupon = (e) => {
      dispatch(deleteACoupon(e));
      setOpen(false);
      setTimeout(() => {
        dispatch(getAllCoupons());
      }, 100);
    };

  const [activeNumber, setActiveNumber] = useState("1");
  const pageNumbersData = [1, 2, 3, 4, 5];
  return (
    <>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>Coupons</h3>
        <div className={styles.recentRowTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.sortTableTitle}>No.</th>
                <th
                  className={
                    sortedTable === "name"
                      ? `${styles.sortTableTitleActive} ${styles.sortTableTitle}`
                      : styles.sortTableTitle
                  }
                  onClick={() => setSortedTable("name")}
                >
                  <span>Name</span>
                  <FaArrowDownAZ />
                </th>
                <th
                  className={
                    sortedTable === "discount"
                      ? `${styles.sortTableTitleActive} ${styles.sortTableTitle}`
                      : styles.sortTableTitle
                  }
                  onClick={() => setSortedTable("discount")}
                >
                  <span>Discount</span>
                  <FaArrowDownAZ />
                </th>
                <th
                  className={
                    sortedTable === "expiry"
                      ? `${styles.sortTableTitleActive} ${styles.sortTableTitle}`
                      : styles.sortTableTitle
                  }
                  onClick={() => setSortedTable("expiry")}
                >
                  <span>Expiry</span>
                  <FaArrowDownAZ />
                </th>
                <th className={styles.sortTableTitle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.key}</td>
                    <td>{el.name}</td>
                    <td>{el.discount}</td>
                    <td>{el.expiry}</td>
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
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteCoupon(couponId);
          }}
          title="Are you sure you want to delete this Coupon?"
        />
      </div>
    </>
  );
};

export default CouponList;
