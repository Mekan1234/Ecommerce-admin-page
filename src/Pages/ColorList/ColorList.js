import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./ColorList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAColor,
  getColors,
  resetState,
} from "../../features/color/colorSlice";
import { FaArrowDownAZ } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomModal from "../../Components/CustomModal/CustomModal";

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setColorId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);

  const [sortedTable, setSortedTable] = useState(null);

  let tableData = [];
  if (sortedTable) {
    const unSortedData = [];
    for (let i = 0; i < colorState.length; i++) {
      unSortedData.push({
        key: i + 1,
        name: colorState[i].title,
        action: (
          <>
            <Link
              to={`/admin/color/${colorState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(colorState[i]._id)}
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
    for (let i = 0; i < colorState.length; i++) {
      tableData.push({
        key: i + 1,
        name: colorState[i].title,
        action: (
          <>
            <Link
              to={`/admin/color/${colorState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(colorState[i]._id)}
            >
              <MdDelete />
            </button>
          </>
        ),
      });
    }
  }
  const deleteColor = (e) => {
    console.log(e);
    dispatch(deleteAColor(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  const [activeNumber, setActiveNumber] = useState("1");
  const pageNumbersData = [1, 2, 3, 4, 5];
  return (
    <>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>Colors</h3>
        <div className={styles.recentRowTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableTitle}>No.</th>
                <th className={styles.tableTitle}>Name</th>
                <th className={styles.tableTitle}>Action</th>
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
            deleteColor(colorId);
          }}
          title="Are you sure you want to delete this Color?"
        />
      </div>
    </>
  );
};

export default ColorList;
