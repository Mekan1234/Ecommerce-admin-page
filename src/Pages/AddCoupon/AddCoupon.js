import React, { useEffect, useState } from "react";
import styles from "./AddCoupon.module.css";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateACoupon,
} from "../../features/coupon/couponSlice";

let userSchema = Yup.object({
  name: Yup.string().required("Coupon Name is Required"),
  expiry: Yup.date().required("Expiry Date is Required"),
  discount: Yup.number().required("Discount Percentage is Required"),
});

const AddCoupon = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const dispatch = useDispatch();
  const getCouponId = location.pathname.split("/")[3];
  const newCoupon = useSelector((state) => state.coupon);
  const {
    isSuccess,
    isLoading,
    isError,
    createdCoupon,
    couponName,
    couponExpiry,
    couponDiscount,
    updatedCoupon,
  } = newCoupon;
  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleString();
    const [days, hours] = newDate.split(",");

    const [day, month, year] = days.split(".");
    return [year, month, day].join("-");
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);
  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Coupon Added Successfully!");
    }
    if (isSuccess && updatedCoupon) {
      toast.success("Coupon Updated Successfully!");
      navigate("/admin/coupon-list")
    }
    if (isError && couponName && couponExpiry && couponDiscount) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormat(couponExpiry) || "",
      discount: couponDiscount || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupon(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <h3 className={styles.addBlogCategoryTitle}>
        {getCouponId ? "Edit" : "Add"} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Coupon Name"
            name="name"
            id="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
          />
          <div className={styles.error}>
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            label="Enter Expiry Date"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            value={formik.values.expiry}
            id="date"
          />
          <div className={styles.error}>
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            label="Enter Discount"
            name="discount"
            onChange={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            value={formik.values.discount}
            id="discount"
          />
          <div className={styles.error}>
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getCouponId ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
