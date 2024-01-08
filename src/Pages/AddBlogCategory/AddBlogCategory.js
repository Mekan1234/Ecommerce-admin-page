import React, { useEffect } from "react";
import styles from "./AddBlogCategory.module.css";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createBlogCategory,
  getABlogCategory,
  resetState,
  updateABlogCategory,
} from "../../features/blogCategory/blogCategorySlice";

let userSchema = Yup.object({
  title: Yup.string().required("Category Name is Required"),
});

const AddBlogCategory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newBlogCategory = useSelector((state) => state.blogCategory);
  const {
    isSuccess,
    isLoading,
    isError,
    createdBlogCategory,
    updatedBlogCategory,
    blogCatName,
  } = newBlogCategory;
  const getBlogCategoryId = location.pathname.split("/")[3];
  useEffect(() => {
    if (getBlogCategoryId !== undefined) {
      dispatch(getABlogCategory(getBlogCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCategoryId]);
  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully!");
    }
    if (updatedBlogCategory && isSuccess) {
      toast.success("Blog Category Updated Successfully!");
      navigate("/admin/blog-category-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBlogCategoryId !== undefined) {
        const data = {
          id: getBlogCategoryId,
          blogCategoryData: values,
        };
        dispatch(updateABlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
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
        {getBlogCategoryId ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter Blog Category"
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
            {getBlogCategoryId ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
