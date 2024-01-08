const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
export const config = {
  headers: {
    Authorization: `Bearer ${
      getUserFromLocalStorage !== null ? getUserFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
