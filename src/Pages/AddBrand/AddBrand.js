import React, { useEffect } from "react";
import styles from "./AddBrand.module.css";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../../features/brand/brandSlice";

let userSchema = Yup.object({
  title: Yup.string().required("Brand name is Required"),
});

const AddBrand = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isLoading,
    isError,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  const getBrandId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (updatedBrand && isSuccess) {
      toast.success("Brand Updated Successfully!");
      navigate("/admin/list-brand");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = {
          id: getBrandId,
          brandData: values,
        };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
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
        {getBrandId ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Brand"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className={styles.error}>
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBrandId ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
