import React, { useEffect, useState } from "react";
import CustomInput from "../../Components/CustomInput/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddProduct.module.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { getBrands } from "../../features/brand/brandSlice";
import { getColors } from "../../features/color/colorSlice";
import Dropzone from "react-dropzone";
import { getCategories } from "../../features/productCategory/productCategorySlice";
import { Select } from "antd";
import { deleteImg, uploadImg } from "../../features/upload/uploadSlice";
import { createProducts, resetState } from "../../features/product/productSlice";

let userSchema = Yup.object({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is Required"),
  category: Yup.string().required("Category is Required"),
  tags: Yup.string().required("Tag is Required"),
  color: Yup.array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
  quantity: Yup.number().required("Quantity is Required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    dispatch(getBrands()); 
    dispatch(getCategories());
    dispatch(getColors());
    formik.values.color = color;
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector(
    (state) => state.productCategory.productCategories
  );
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isLoading, isError, createdProduct } = newProduct;
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isLoading, isError]);
  const colorOpt = [];
  colorState.forEach((i) => {
    colorOpt.push({
      label: i.title,
      value: i._id,
    });
  });
  const img = [];
  imgState.forEach((i) => {
    img.push({
      URL: i.URL,
      name: i.name,
    });
  });
  useEffect(() => {
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      tags: "",
      color: "",
      quantity: "",
      images: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState())
      }, 3000);
    },
  });
  const handleColors = (e) => {
    setColor(e);
  };
  return (
    <div>
      <h3 className={styles.title}>Add Product</h3>
      <div>
        <form
          action=""
          className={styles.addProductForm}
          onSubmit={formik.handleSubmit}
        >
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            value={formik.values.title}
          />
          <div className={styles.error}>
            {formik.touched.title && formik.errors.title}
          </div>
          <div className={styles.productDescription}>
            <ReactQuill
              theme="snow"
              value={formik.values.description}
              name="description"
              onChange={formik.handleChange("description")}
            />
          </div>
          <div className={styles.error}>
            {formik.touched.description && formik.errors.description}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChange={formik.handleChange("price")}
            onBlur={formik.handleBlur("price")}
            value={formik.values.price}
          />
          <div className={styles.error}>
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
            value={formik.values.brand}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Brand</option>
            {brandState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className={styles.error}>
            {formik.touched.brand && formik.errors.brand}
          </div>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {categoryState.map((i, j) => {
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
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className={styles.error}>
            {formik.touched.tags && formik.errors.tags}
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="Select colors"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={colorOpt}
          />
          <div className={styles.error}>
            {formik.touched.color && formik.errors.color}
          </div>
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="quantity"
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}
            value={formik.values.quantity}
          />
          <div className={styles.error}>
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white p-5 border-1 text-center">
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
