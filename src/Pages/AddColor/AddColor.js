import React, { useEffect } from "react";
import styles from "./AddColor.module.css";
import CustomInput from "../../Components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from "../../features/color/colorSlice";

let userSchema = Yup.object({
  title: Yup.string().required("Color is Required"),
});

const AddColor = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getColorId = location.pathname.split("/")[3];
  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isLoading,
    isError,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;
  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!");
    }
    if (updatedColor && isSuccess) {
      toast.success("Color Updated Successfully!");
      navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = {
          id: getColorId,
          colorData: values,
        };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
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
        {getColorId ? "Edit" : "Add"} Color
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter Product Color"
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
            {getColorId ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
