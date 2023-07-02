import { useAppDispatch } from "app/hook";
import axios from "axios";
import Footer from "components/footer";
import { HeaderAuth } from "components/header-auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { checkIsAdmin } from "redux/auth/authThunk";
import { loadingOveride } from "utils/loading";
import { SwalAlert } from "utils/sweet-alter";
import ClippedDrawer from "./admin-drawer";

const AdminDashBoard = () => {
  const dispatch = useAppDispatch();
  const [isChecking, setIsChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const checkRole = async () => {
    const accessToken = localStorage.getItem("access_token");
    const response = await dispatch(checkIsAdmin(accessToken as String));
    if (response.payload && (response.payload as any).status === 200) {
      setIsChecking(false);
      setIsAdmin(true);
    } else {
      setIsChecking(false);
      SwalAlert("Failed", (response as any).error.message, "error").then(
        (result) => {
          navigate("/");
        }
      );
    }
  };
  useEffect(() => {
    checkRole();
  }, []);
  return (
    <>
      {
        <BeatLoader
          color={"#4096FF"}
          loading={isChecking}
          cssOverride={loadingOveride}
          size={20}
          margin={2}
          speedMultiplier={1}
        />
      }
      {isAdmin && (
        <div>
          <ClippedDrawer />
        </div>
      )}
    </>
  );
};

export default AdminDashBoard;
