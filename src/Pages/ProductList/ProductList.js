import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ProductList.module.css";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { getProducts } from "../../features/product/productSlice";
import { FaArrowDownAZ } from "react-icons/fa6";
import { Link } from "react-router-dom";
const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products);
  const [sortedTable, setSortedTable] = useState(null);
  let tableData = [];
  if (sortedTable) {
    const unSortedData = [];
    for (let i = 0; i < productState.length; i++) {
      unSortedData.push({
        key: i + 1,
        title: productState[i].title,
        brand: productState[i].brand,
        category: productState[i].category,
        color: productState[i].color,
        price: `$ ${productState[i].price}`,
        action: (
          <>
            <Link to="/" className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <MdDelete />
            </Link>
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
    for (let i = 0; i < productState.length; i++) {
      console.log(productState[i].color);
      tableData.push({
        key: i + 1,
        title: productState[i].title,
        brand: productState[i].brand,
        category: productState[i].category,
        color: productState[i].color.map((i, j) => {
          return <p key={j}>{i}</p>;
        }),
        price: `${productState[i].price}`,
        action: (
          <>
            <Link to="/" className=" fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <MdDelete />
            </Link>
          </>
        ),
      });
    }
  }
  const [activeNumber, setActiveNumber] = useState("1");
  const pageNumbersData = [1, 2, 3, 4, 5];
  return (
    <>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>Products</h3>
        <div className={styles.recentRowTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.sortTableTitle}>No.</th>
                <th
                  className={
                    sortedTable === "title"
                      ? `${styles.sortTableTitleActive} ${styles.sortTableTitle}`
                      : styles.sortTableTitle
                  }
                  onClick={() => setSortedTable("title")}
                >
                  <span>Title</span>
                  <FaArrowDownAZ />
                </th>
                <th
                  className={
                    sortedTable === "brand"
                      ? `${styles.sortTableTitleActive} ${styles.sortTableTitle}`
                      : styles.sortTableTitle
                  }
                  onClick={() => setSortedTable("brand")}
                >
                  <span>Brand</span>
                  <FaArrowDownAZ />
                </th>
                <th
                  className={
                    sortedTable === "category"
                      ? `${styles.sortTableTitleActive} ${styles.sortTableTitle}`
                      : styles.sortTableTitle
                  }
                  onClick={() => setSortedTable("category")}
                >
                  <span>Category</span>
                  <FaArrowDownAZ />
                </th>
                <th
                  className={
                    sortedTable === "color"
                      ? `${styles.sortTableTitleActive} ${styles.sortTableTitle}`
                      : styles.sortTableTitle
                  }
                  onClick={() => setSortedTable("color")}
                >
                  <span>Color</span>
                  <FaArrowDownAZ />
                </th>
                <th
                  className={
                    sortedTable === "price"
                      ? `${styles.sortTableTitleActive} ${styles.sortTableTitle}`
                      : styles.sortTableTitle
                  }
                  onClick={() => setSortedTable("price")}
                >
                  <span>Price</span>
                  <FaArrowDownAZ />
                </th>
                <th className={styles.tableTitle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.key}</td>
                    <td>{el.title}</td>
                    <td>{el.brand}</td>
                    <td>{el.category}</td>
                    <td>{el.color}</td>
                    <td>{el.price}</td>
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

export default ProductList;
