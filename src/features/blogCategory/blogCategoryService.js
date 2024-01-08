import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const getBlogCategories = async (userData) => {
  const response = await axios.get(`${base_url}blogcategory/`);
  return response.data;
};
const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(`${base_url}blogcategory`, blogCategory, config);
  return response.data;
};

const updateBlogCategory = async (blogCategory) => {
  const response = await axios.put(
    `${base_url}blogCategory/${blogCategory.id}`,
    { title: blogCategory.blogCategoryData.title },
    config
  );
  return response.data;
};
const getBlogCategory = async (id) => {
  const response = await axios.get(`${base_url}blogCategory/${id}`, config);
  return response.data;
};
const deleteBlogCategory = async (id) => {
  const response = await axios.delete(`${base_url}blogCategory/${id}`, config);
  return response.data;
};
const blogCategoryService = {
  getBlogCategories,
  createBlogCategory,
  updateBlogCategory,
  getBlogCategory,
  deleteBlogCategory,
};

export default blogCategoryService;
