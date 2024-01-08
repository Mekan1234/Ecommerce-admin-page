import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./CategoryList.module.css";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaArrowDownAZ } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAProductCategory,
  getCategories,
  resetState,
} from "../../features/productCategory/productCategorySlice";
import CustomModal from "../../Components/CustomModal/CustomModal";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [productCategoryId, setProductCategoryId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setProductCategoryId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const productCategoryState = useSelector(
    (state) => state.productCategory.productCategories
  );
  const [sortedTable, setSortedTable] = useState(null);
  let tableData = [];
  if (sortedTable) {
    const unSortedData = [];
    for (let i = 0; i < productCategoryState.length; i++) {
      unSortedData.push({
        key: i + 1,
        name: productCategoryState[i].title,
        action: (
          <>
            <Link
              to={`/admin/category/${productCategoryState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(productCategoryState[i]._id)}
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
    for (let i = 0; i < productCategoryState.length; i++) {
      tableData.push({
        key: i + 1,
        name: productCategoryState[i].title,
        action: (
          <>
            <Link
              to={`/admin/category/${productCategoryState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(productCategoryState[i]._id)}
            >
              <MdDelete />
            </button>
          </>
        ),
      });
    }
  }

  const deleteProductCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  const [activeNumber, setActiveNumber] = useState("1");
  const pageNumbersData = [1, 2, 3, 4, 5];
  return (
    <>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>Product Categories</h3>
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
                  onClick={() =>
                    sortedTable ? setSortedTable(null) : setSortedTable("name")
                  }
                >
                  <span>Name</span>
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
            deleteProductCategory(productCategoryId);
          }}
          title="Are you sure you want to delete this Product Category?"
        />
      </div>
    </>
  );
};

export default CategoryList;
