import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!success || !orderId) {
        toast.error("Invalid payment verification request.");
        return navigate("/");
      }

      try {
        const response = await axios.post(`${url}/api/order/verify`, {
          success,
          orderId,
        });

        if (response.data.success) {
          toast.success("Payment verified successfully!");
          navigate("/myorders");
        } else {
          toast.error("Payment verification failed.");
          navigate("/");
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error("Server error while verifying payment.");
        navigate("/");
      }
    };

    verifyPayment();
  }, [success, orderId, url, navigate]);

  return (
    <div>
      <div className="verify">
        <div className="spinner"></div>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Verify;
