import React from "react";
import { ToastContainer } from "react-toastify";

const Toaster = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={1500}
      limit={3}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

export default Toaster;
