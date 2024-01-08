import React, { useEffect } from "react";
import styles from "./AddCategory.module.css";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createProductCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from "../../features/productCategory/productCategorySlice";

let userSchema = Yup.object({
  title: Yup.string().required("Category name is Required"),
});

const AddCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProductCategoryId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getProductCategoryId !== undefined) {
      dispatch(getAProductCategory(getProductCategoryId));
    } else {
      dispatch(resetState);
    }
  }, [getProductCategoryId]);

  const newCategory = useSelector((state) => state.productCategory);
  const {
    isSuccess,
    isLoading,
    isError,
    createdProductCategory,
    updatedProductCategory,
    categoryName,
  } = newCategory;
  useEffect(() => {
    if (isSuccess && createdProductCategory) {
      toast.success("Category Added Successfully!");
    }
    if (updatedProductCategory && isSuccess) {
      toast.success("Category Updated Successfully!");
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getProductCategoryId !== undefined) {
        const data = {
          id: getProductCategoryId,
          productCategoryData: values,
        };
        dispatch(updateAProductCategory(data));
      } else {
        dispatch(createProductCategory(values));
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
        {getProductCategoryId ? "Edit" : "Add"} Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Product Category"
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
            {getProductCategoryId ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
