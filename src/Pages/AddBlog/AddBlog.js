import React, { useEffect, useState } from "react";
import styles from "./AddBlog.module.css";
import CustomInput from "../../Components/CustomInput/CustomInput";
import ReactQuill from "react-quill";
import Dropzone from "react-dropzone";
import {
  deleteImg,
  resetImgState,
  uploadImg,
} from "../../features/upload/uploadSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from "../../features/blogs/blogSlice";
import { getCategories } from "../../features/blogCategory/blogCategorySlice";

let userSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required"),
});

const AddBlog = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imgState = useSelector((state) => state.upload.images);
  const getBlogId = location.pathname.split("/")[3];
  const blogState = useSelector((state) => state.blogs);
  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategories
  );
  const {
    isError,
    isLoading,
    isSuccess,
    createdBlog,
    blogName,
    blogDescription,
    blogCategory,
    blogImages,
    updatedBlog,
  } = blogState;

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [location.pathname]);
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully!");
    }
    if (updatedBlog && isSuccess) {
      toast.success("Blog Updated Successfully!");
      navigate("/admin/blog-list");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isLoading, isError]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      URL: i.URL,
      name: i.name,
    });
  });
  useEffect(() => {
    formik.values.images = img;
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDescription || "",
      category: blogCategory || "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
          dispatch(resetImgState());
          dispatch(getCategories());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className={styles.title}>{getBlogId ? "Edit" : "Add"} Blog</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className={styles.addBlockInput}>
            <CustomInput
              type="text"
              label="Enter BLog Title"
              name="title"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
            />
          </div>
          <div className={styles.error}>
            {formik.touched.title && formik.errors.title}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mt-3"
            id=""
          >
            <option value="">Select Blog Category</option>
            {blogCategoryState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className={styles.error}>
            {formik.touched.category && formik.errors.category}
          </div>
          <ReactQuill
            theme="snow"
            className="mt-3"
            name="description"
            onChange={formik.handleChange("description")}
            value={formik.values.description}
          />
          <div className={styles.error}>
            {formik.touched.description && formik.errors.description}
          </div>
          <div className="bg-white p-5 border-1 text-center mt-3">
            <Dropzone
              onDrop={(acceptedFiles) => {
                dispatch(uploadImg(acceptedFiles));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className={styles.AddProductImages}>
            {imgState?.map((i, j) => {
              return (
                <div key={j} className={styles.AddProductImageBlock}>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(deleteImg(i.name));
                    }}
                    className="btn-close position-absolute"
                    style={{ top: "5px", right: "5px" }}
                  ></button>
                  <img
                    src={i.URL}
                    alt=""
                    className={styles.AddProductImage}
                    width={200}
                    height={200}
                  />
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            className="btn btn-success border-0 rounded-3 my-5"
          >
            {getBlogId ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
