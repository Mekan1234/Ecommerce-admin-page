import React, { useState } from "react";
import styles from "./MainLayout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { IoPersonOutline } from "react-icons/io5";
import {
  AiOutlineDashboard,
  AiOutlineMenuFold,
  AiOutlineShoppingCart,
  AiOutlineBgColors,
  AiOutlineMenuUnfold,
  AiOutlineLogout,
} from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosArrowDown, IoIosNotifications } from "react-icons/io";
import { BiCategoryAlt } from "react-icons/bi";
import { FaClipboardList, FaBloggerB } from "react-icons/fa6";
import { ImBlog } from "react-icons/im";
import image from "../../main-banner-1.jpg";
import { Link } from "react-router-dom";
const MainLayout = () => {
  const [selected, setSelected] = useState({
    id: "admin",
    select: true,
  });
  const [active, setActive] = useState(false);
  const [catalog, setCatalog] = useState(false);
  const [catalogId, setCatalogId] = useState(null);
  const [blog, setBlog] = useState(false);
  const [blogId, setBlogId] = useState(null);
  const [marketing, setMarketing] = useState(false);
  const [marketingId, setMarketingId] = useState(null);
  const [smallSidebar, setSmallSidebar] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={styles.mainLayoutWrapper}>
      <div
        className={
          smallSidebar
            ? `${styles.smallSidebar} ${styles.sidebar}`
            : `${styles.BigSidebar} ${styles.sidebar}`
        }
        // onMouseEnter={() => setSmallSidebar(false)}
        // onMouseLeave={() => setSmallSidebar(true)}
      >
        <div className={styles.logoBlock}>
          {smallSidebar ? (
            <h2 className={styles.logoTitle}>DC</h2>
          ) : (
            <h2 className={styles.logoTitle}>Dev Corner</h2>
          )}
        </div>
        <div className={styles.sidebarBlock}>
          <div
            id="admin"
            onClick={(e) => {
              setSelected({ id: e.currentTarget.id, select: true });
              navigate("/admin");
            }}
            className={
              selected.select && selected.id === "admin"
                ? `${styles.sidebarItem} ${styles.active}`
                : styles.sidebarItem
            }
          >
            <span
              className={
                smallSidebar ? styles.smallSidebarIcon : styles.itemIcon
              }
            >
              <AiOutlineDashboard />
            </span>
            {!smallSidebar && <div className={styles.itemName}>Dashboard</div>}
          </div>
          <div
            id="customers"
            onClick={(e) => {
              setSelected({ id: e.currentTarget.id, select: true });
              navigate("customers");
            }}
            className={
              selected.select && selected.id === "customers"
                ? `${styles.sidebarItem} ${styles.active}`
                : styles.sidebarItem
            }
          >
            <span
              className={
                smallSidebar ? styles.smallSidebarIcon : styles.itemIcon
              }
            >
              <IoPersonOutline />
            </span>
            {!smallSidebar && <div className={styles.itemName}>Customers</div>}
          </div>
          <div
            className={
              catalog && catalogId === "product"
                ? `${styles.sidebarItemBlock} ${styles.dropdown}`
                : styles.sidebarItemBlock
            }
          >
            <div
              id="product"
              className={styles.sidebarItem}
              onClick={(e) => {
                setCatalog((prev) => !prev);
                setCatalogId(e.currentTarget.id);
              }}
            >
              <span
                className={
                  smallSidebar ? styles.smallSidebarIcon : styles.itemIcon
                }
              >
                <AiOutlineShoppingCart />
              </span>
              {!smallSidebar && (
                <div className={styles.itemNameBlock}>
                  <div className={styles.itemName}>Catalog</div>
                  <div className={styles.itemNameBlockIcon}>
                    <IoIosArrowDown />
                  </div>
                </div>
              )}
            </div>
            {!smallSidebar && (
              <div
                className={
                  catalog && catalogId === "product"
                    ? `${styles.dropdownMenu} ${styles.dropdownActive}`
                    : `${styles.dropdownMenu} ${styles.disableDropdown}`
                }
              >
                <ul
                  onClick={() => {
                    setSelected({ id: null, select: false });
                  }}
                  className={styles.innerItems}
                >
                  <li
                    id="addProduct"
                    onClick={(e) => {
                      navigate("product");
                      setActive(e.currentTarget.id);
                    }}
                    className={
                      active === "addProduct"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <AiOutlineShoppingCart />
                    <span>Product</span>
                  </li>
                  <li
                    id="list-product"
                    onClick={(e) => {
                      navigate("list-product");
                      setActive(e.currentTarget.id);
                    }}
                    className={
                      active === "list-product"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <AiOutlineShoppingCart />
                    <span>Product List</span>
                  </li>
                  <li
                    onClick={(e) => {
                      navigate("brand");
                      setActive(e.currentTarget.id);
                    }}
                    id="brand"
                    className={
                      active === "brand"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <SiBrandfolder />
                    <span>Brand</span>
                  </li>
                  <li
                    onClick={(e) => {
                      navigate("list-brand");
                      setActive(e.currentTarget.id);
                    }}
                    id="list-brand"
                    className={
                      active === "list-brand"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <SiBrandfolder />
                    <span>Brand List</span>
                  </li>
                  <li
                    id="category"
                    onClick={(e) => {
                      navigate("category");
                      setActive(e.currentTarget.id);
                    }}
                    className={
                      active === "category"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <BiCategoryAlt />
                    <span>Category</span>
                  </li>
                  <li
                    id="list-category"
                    onClick={(e) => {
                      navigate("list-category");
                      setActive(e.currentTarget.id);
                    }}
                    className={
                      active === "list-category"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <BiCategoryAlt />
                    <span>Category List</span>
                  </li>
                  <li
                    onClick={(e) => {
                      navigate("color");
                      setActive(e.currentTarget.id);
                    }}
                    id="color"
                    className={
                      active === "color"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <AiOutlineBgColors />
                    <span>Color</span>
                  </li>
                  <li
                    id="list-color"
                    onClick={(e) => {
                      navigate("list-color");
                      setActive(e.currentTarget.id);
                    }}
                    className={
                      active === "list-color"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <AiOutlineBgColors />
                    <span>Color List</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            id="orders"
            onClick={(e) => {
              setSelected({ id: e.currentTarget.id, select: true });
              navigate("orders");
            }}
            className={
              selected.select && selected.id === "orders"
                ? `${styles.sidebarItem} ${styles.active}`
                : styles.sidebarItem
            }
          >
            <span
              className={
                smallSidebar ? styles.smallSidebarIcon : styles.itemIcon
              }
            >
              <FaClipboardList />
            </span>
            {!smallSidebar && <div className={styles.itemName}>Orders</div>}
          </div>
          <div
            className={
              marketing && marketingId === "marketing"
                ? `${styles.sidebarItemBlock} ${styles.dropdown}`
                : styles.sidebarItemBlock
            }
          >
            <div
              id="marketing"
              className={styles.sidebarItem}
              onClick={(e) => {
                setMarketing((prev) => !prev);
                setMarketingId(e.currentTarget.id);
              }}
            >
              <span
                className={
                  smallSidebar ? styles.smallSidebarIcon : styles.itemIcon
                }
              >
                <RiCouponLine />
              </span>
              {!smallSidebar && (
                <div className={styles.itemNameBlock}>
                  <div className={styles.itemName}>Marketing</div>
                  <div className={styles.itemNameBlockIcon}>
                    <IoIosArrowDown />
                  </div>
                </div>
              )}
            </div>
            {!smallSidebar && (
              <div
                className={
                  marketing && marketingId === "marketing"
                    ? `${styles.dropdownMenu} ${styles.dropdownActive3}`
                    : `${styles.dropdownMenu} ${styles.disableDropdown3}`
                }
              >
                <ul
                  onClick={() => {
                    setSelected({ id: null, select: false });
                  }}
                  className={styles.innerItems}
                >
                  <li
                    onClick={(e) => {
                      navigate("coupon");
                      setActive(e.currentTarget.id);
                    }}
                    id="coupon"
                    className={
                      active === "coupon"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <ImBlog />
                    <span>Add Coupon</span>
                  </li>
                  <li
                    onClick={(e) => {
                      navigate("coupon-list");
                      setActive(e.currentTarget.id);
                    }}
                    id="coupon-list"
                    className={
                      active === "coupon-list"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <RiCouponLine />
                    <span>Coupon List</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            className={
              blog && blogId === "blog"
                ? `${styles.sidebarItemBlock} ${styles.dropdown}`
                : styles.sidebarItemBlock
            }
          >
            <div
              id="blog"
              className={styles.sidebarItem}
              onClick={(e) => {
                setBlog((prev) => !prev);
                setBlogId(e.currentTarget.id);
              }}
            >
              <span
                className={
                  smallSidebar ? styles.smallSidebarIcon : styles.itemIcon
                }
              >
                <FaBloggerB />
              </span>
              {!smallSidebar && (
                <div className={styles.itemNameBlock}>
                  <div className={styles.itemName}>Blogs</div>
                  <div className={styles.itemNameBlockIcon}>
                    <IoIosArrowDown />
                  </div>
                </div>
              )}
            </div>
            {!smallSidebar && (
              <div
                className={
                  blog && blogId === "blog"
                    ? `${styles.dropdownMenu} ${styles.dropdownActive2}`
                    : `${styles.dropdownMenu} ${styles.disableDropdown2}`
                }
              >
                <ul
                  onClick={() => {
                    setSelected({ id: null, select: false });
                  }}
                  className={styles.innerItems}
                >
                  <li
                    onClick={(e) => {
                      navigate("blog");
                      setActive(e.currentTarget.id);
                    }}
                    id="blog"
                    className={
                      active === "blog"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <ImBlog />
                    <span>Add Blog</span>
                  </li>
                  <li
                    onClick={(e) => {
                      navigate("blog-list");
                      setActive(e.currentTarget.id);
                    }}
                    id="blog-list"
                    className={
                      active === "blog-list"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <FaBloggerB />
                    <span>Blog List</span>
                  </li>
                  <li
                    onClick={(e) => {
                      navigate("blog-category");
                      setActive(e.currentTarget.id);
                    }}
                    id="blog-category"
                    className={
                      active === "blog-category"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <ImBlog />
                    <span>Add Blog Category</span>
                  </li>
                  <li
                    onClick={(e) => {
                      navigate("blog-category-list");
                      setActive(e.currentTarget.id);
                    }}
                    id="blog-category-list"
                    className={
                      active === "blog-category-list"
                        ? `${styles.active} ${styles.innerItem}`
                        : styles.innerItem
                    }
                  >
                    <FaBloggerB />
                    <span>Blog Category List</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div
            id="enquiries"
            onClick={(e) => {
              setSelected({ id: e.currentTarget.id, select: true });
              navigate("enquiries");
            }}
            className={
              selected.select && selected.id === "enquiries"
                ? `${styles.sidebarItem} ${styles.active}`
                : styles.sidebarItem
            }
          >
            <span
              className={
                smallSidebar ? styles.smallSidebarIcon : styles.itemIcon
              }
            >
              <FaClipboardList />
            </span>
            {!smallSidebar && <div className={styles.itemName}>Enquiries</div>}
          </div>
          <div
            id="signOut"
            onClick={(e) => {
              localStorage.clear();
              window.location.reload();
            }}
            className={
              selected.select && selected.id === "signOut"
                ? `${styles.sidebarItem} ${styles.active}`
                : styles.sidebarItem
            }
          >
            <span
              className={
                smallSidebar ? styles.smallSidebarIcon : styles.itemIcon
              }
            >
              <AiOutlineLogout />
            </span>
            {!smallSidebar && <div className={styles.itemName}>Sign Out</div>}
          </div>
        </div>
      </div>
      <div className={styles.layoutBody}>
        <div className={styles.header}>
          <div
            className={styles.headerIcon}
            onClick={() => setSmallSidebar((prev) => !prev)}
          >
            {smallSidebar ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          </div>
          <div className={styles.headerRightElements}>
            <div className={styles.notification}>
              <IoIosNotifications />
              <span className={styles.notificationNumber}>5</span>
            </div>
            <div className="dropdown">
              <div className={styles.personalDates}>
                <div className={styles.headerImage}>
                  <img src={image} alt="" />
                </div>
                <div
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <h5 className={styles.name}>Mekan</h5>
                  <p className={styles.account}>usmanowmekan2001@gmail.com</p>
                </div>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <Link to="/" className="dropdown-item py-1 mb-1">
                      View Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="dropdown-item py-1 mb-1">
                      Sign Out
                    </Link>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
