import React, { useEffect } from "react";
import styles from "./ViewEnquiry.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from "../../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";
const ViewEnquiry = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnquiryId = location.pathname.split("/")[3];
  const enquiryState = useSelector((state) => state.enquiry);
  const {
    enquiryName,
    enquiryEmail,
    enquiryMobile,
    enquiryComment,
    enquiryStatus,
  } = enquiryState;
  useEffect(() => {
    dispatch(getAEnquiry(getEnquiryId));
  }, [getEnquiryId]);
  const goBack = () => {
    navigate(-1);
  };
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEnquiryId));
    }, 100);
  };
  return (
    <div>
      <div className={styles.enquiryTitleBlock}>
        <h3 className={styles.title}>View Enquiry</h3>
        <button className={styles.enqButton} onClick={goBack}>
          <BiArrowBack className="fs-6" /> Go Back
        </button>
      </div>
      <div className={styles.viewBlock}>
        <div className={styles.enquiryItemBlock}>
          <h6 className={styles.itemTitle}>Name:</h6>
          <p className={styles.itemTitle}>{enquiryName}</p>
        </div>
        <div className={styles.enquiryItemBlock}>
          <h6 className={styles.itemTitle}>Mobile:</h6>
          <a href={`tel:+993${enquiryMobile}`} className={styles.itemTitle}>
            +993 {enquiryMobile}
          </a>
        </div>
        <div className={styles.enquiryItemBlock}>
          <h6 className={styles.itemTitle}>Email:</h6>
          <a href={`mailto:${enquiryEmail}`} className={styles.itemTitle}>
            {enquiryEmail}
          </a>
        </div>
        <div className={styles.enquiryItemBlock}>
          <h6 className={styles.itemTitle}>Comment:</h6>
          <p className={styles.itemTitle}>{enquiryComment}</p>
        </div>
        <div className={styles.enquiryItemBlock}>
          <h6 className={styles.itemTitle}>Status:</h6>
          <p className={styles.itemTitle}>{enquiryStatus}</p>
        </div>
        <div className={styles.enquiryItemBlock}>
          <h6 className={styles.itemTitle}>Change Status:</h6>
          <div>
            <select
              name=""
              id=""
              defaultValue={enquiryStatus ? enquiryStatus : "Submitted"}
              className="form-control form-select"
              onChange={(e) => setEnquiryStatus(e.target.value, getEnquiryId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiry;
