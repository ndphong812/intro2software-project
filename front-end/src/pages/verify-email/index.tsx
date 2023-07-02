import { useAppDispatch, useAppSelector } from "app/hook";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { authState } from "redux/auth/authSlice";
import { verifyEmail } from "redux/auth/authThunk";
import { loadingOveride } from "utils/loading";
import { SwalAlert } from "utils/sweet-alter";

const VerifyEmail = () => {
  const { token } = useParams();
  const selector = useAppSelector(authState);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const verify = async (token: String) => {
    const response = await dispatch(verifyEmail(token));
    if (response.payload && (response.payload as any).status === 200) {
      SwalAlert(
        "Success",
        `${(response.payload as any).data.message}. Go to Login Page.`,
        "success"
      ).then((result) => {
        navigate("/auth/login");
      });
    } else {
      SwalAlert("Failed", (response as any).error.message, "error");
    }
  };

  useEffect(() => {
    if (token) {
      verify(token);
    }
  }, []);

  return (
    <>
      <BeatLoader
        color={"#4096FF"}
        loading={Boolean(selector.isLoading)}
        cssOverride={loadingOveride}
        size={20}
        margin={2}
        speedMultiplier={1}
      />
    </>
  );
};

export default VerifyEmail;
