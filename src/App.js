import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Components/MainLayout/MainLayout";
import Login from "./Pages/Login/Login";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Enquiries from "./Pages/Enquiries/Enquiries";
import BlogList from "./Pages/BlogList/BlogList";
import BlogCategoryList from "./Pages/BlogCategoryList/BlogCategoryList";
import Orders from "./Pages/Orders/Orders";
import Customers from "./Pages/Customers/Customers";
import ColorList from "./Pages/ColorList/ColorList";
import CategoryList from "./Pages/CategoryList/CategoryList";
import BrandList from "./Pages/BrandList/BrandList";
import ProductList from "./Pages/ProductList/ProductList";
import AddBlog from "./Pages/AddBlog/AddBlog";
import AddBlogCategory from "./Pages/AddBlogCategory/AddBlogCategory";
import AddColor from "./Pages/AddColor/AddColor";
import AddCategory from "./Pages/AddCategory/AddCategory";
import AddBrand from "./Pages/AddBrand/AddBrand";
import AddProduct from "./Pages/AddProduct/AddProduct";
import CouponList from "./Pages/CouponList/CouponList";
import AddCoupon from "./Pages/AddCoupon/AddCoupon";
import ViewEnquiry from "./Pages/ViewEnquiry/ViewEnquiry";
import ViewOrder from "./Pages/ViewOrder/ViewOrder";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <OpenRoutes>
                <Login />
              </OpenRoutes>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoutes>
                <MainLayout />
              </PrivateRoutes>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="enquiries/:id" element={<ViewEnquiry />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog/:id" element={<AddBlog />} />
            <Route path="coupon-list" element={<CouponList />} />
            <Route path="coupon" element={<AddCoupon />} />
            <Route path="coupon/:id" element={<AddCoupon />} />
            <Route path="blog-category-list" element={<BlogCategoryList />} />
            <Route path="blog-category" element={<AddBlogCategory />} />
            <Route path="blog-category/:id" element={<AddBlogCategory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<ViewOrder />} />
            <Route path="customers" element={<Customers />} />
            <Route path="list-color" element={<ColorList />} />
            <Route path="color" element={<AddColor />} />
            <Route path="color/:id" element={<AddColor />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="category/:id" element={<AddCategory />} />
            <Route path="list-category" element={<CategoryList />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="brand/:id" element={<AddBrand />} />
            <Route path="list-brand" element={<BrandList />} />
            <Route path="list-product" element={<ProductList />} />
            <Route path="product" element={<AddProduct />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
