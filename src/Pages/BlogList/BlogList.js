import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./BlogList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import {
  deleteABlog,
  getBlogs,
  resetState,
} from "../../features/blogs/blogSlice";
import CustomModal from "../../Components/CustomModal/CustomModal";
const BlogList = () => {
  const [open, setOpen] = useState(false);
  const [blogListId, setBlogListId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setBlogListId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);
  const getBlogState = useSelector((state) => state.blogs.blogs);
  const [sortedTable, setSortedTable] = useState(null);
  let tableData = [];
  if (sortedTable) {
    const unSortedData = [];
    for (let i = 0; i < getBlogState.length; i++) {
      unSortedData.push({
        key: i + 1,
        title: getBlogState[i].title,
        category: getBlogState[i].category,
        action: (
          <>
            <Link
              to={`/admin/blog/${getBlogState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(getBlogState[i]._id)}
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
    for (let i = 0; i < getBlogState.length; i++) {
      tableData.push({
        key: i + 1,
        title: getBlogState[i].title,
        category: getBlogState[i].category,
        action: (
          <>
            <Link
              to={`/admin/blog/${getBlogState[i]._id}`}
              className=" fs-3 text-danger"
            >
              <BiEdit />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(getBlogState[i]._id)}
            >
              <MdDelete />
            </button>
          </>
        ),
      });
    }
  }

  const deleteBlog = (e) => {
    dispatch(deleteABlog(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
  };

  const [activeNumber, setActiveNumber] = useState("1");
  const pageNumbersData = [1, 2, 3, 4, 5];
  return (
    <>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>Blogs list</h3>
        <div className={styles.recentRowTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableTitle}>No.</th>
                <th className={styles.tableTitle}>Name</th>
                <th className={styles.tableTitle}>Category</th>
                <th className={styles.tableTitle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((el, index) => {
                return (
                  <tr key={index}>
                    <td>{el.key}</td>
                    <td>{el.title}</td>
                    <td>{el.category}</td>
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
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteBlog(blogListId);
          }}
          title="Are you sure you want to delete this Blog?"
        />
      </div>
    </>
  );
};

export default BlogList;
