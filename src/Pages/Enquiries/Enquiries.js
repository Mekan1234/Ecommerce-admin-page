import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styles from "./Enquiries.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowDownAZ } from "react-icons/fa6";
import { AiOutlineEye } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateAEnquiry,
} from "../../features/enquiry/enquirySlice";
import { Link } from "react-router-dom";
import CustomModal from "../../Components/CustomModal/CustomModal";

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setEnqId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);
  const [sortedTable, setSortedTable] = useState(null);

  let tableData = [];
  if (sortedTable) {
    const unSortedData = [];
    for (let i = 0; i < enquiryState.length; i++) {
      unSortedData.push({
        key: i + 1,
        name: enquiryState[i].name,
        email: enquiryState[i].email,
        mobile: enquiryState[i].mobile,
        status: (
          <>
            <select
              name=""
              id=""
              defaultValue={
                enquiryState[i].status ? enquiryState[i].status : "Submitted"
              }
              className="form-control form-select"
              onChange={(e) =>
                setEnquiryStatus(e.target.value, enquiryState[i]._id)
              }
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </>
        ),
        action: (
          <>
            <Link
              className="ms-3 fs-3 text-danger"
              to={`/admin/enquiries/${enquiryState[i]._id}`}
            >
              <AiOutlineEye />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(enquiryState[i]._id)}
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
    for (let i = 0; i < enquiryState.length; i++) {
      tableData.push({
        key: i + 1,
        name: enquiryState[i].name,
        email: enquiryState[i].email,
        mobile: enquiryState[i].mobile,
        status: (
          <>
            <select
              name=""
              id=""
              defaultValue={
                enquiryState[i].status ? enquiryState[i].status : "Submitted"
              }
              className="form-control form-select"
              onChange={(e) =>
                setEnquiryStatus(e.target.value, enquiryState[i]._id)
              }
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </>
        ),
        action: (
          <>
            <Link
              className="ms-3 fs-3 text-danger"
              to={`/admin/enquiries/${enquiryState[i]._id}`}
            >
              <AiOutlineEye />
            </Link>
            <button
              className="ms-3 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(enquiryState[i]._id)}
            >
              <MdDelete />
            </button>
          </>
        ),
      });
    }
  }
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };
  const deleteEnq = (e) => {
    console.log(e);
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  const [activeNumber, setActiveNumber] = useState("1");
  const pageNumbersData = [1, 2, 3, 4, 5];
  return (
    <>
      <div className={styles.recentRow}>
        <h3 className={styles.title}>Enquiries</h3>
        <div className={styles.recentRowTable}>
          <table>
            <thead>
              <tr>
                <th className={styles.tableTitle}>No.</th>
                <th className={styles.tableTitle}>Name</th>
                <th className={styles.tableTitle}>Email</th>
                <th className={styles.tableTitle}>Mobile</th>
                <th className={styles.tableTitle}>Status</th>
                <th className={styles.tableTitle}>Action</th>
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
                    <td>{el.status}</td>
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
            deleteEnq(enqId);
          }}
          title="Are you sure you want to delete this enquiry?"
        />
      </div>
    </>
  );
};

export default Enquiries;
