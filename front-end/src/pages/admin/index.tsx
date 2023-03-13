import { useAppDispatch } from "app/hook";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { checkIsAdmin } from "redux/auth/authThunk";
import { loadingOveride } from "utils/loading";
import { SwalAlert } from "utils/sweet-alter";

const AdminDashBoard = () => {

    const dispatch = useAppDispatch();
    const [isChecking, setIsChecking] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const checkRole = async () => {
        const accessToken = localStorage.getItem('access_token');
        const response = await dispatch(checkIsAdmin(accessToken as String));
        console.log("response", response);
        if (response.payload && (response.payload as any).status === 200) {
            setIsChecking(false);
            setIsAdmin(true);
        }
        else {
            setIsChecking(false);
            SwalAlert("Failed", (response as any).error.message, "error").then(result => {
                navigate('/');
            });
        }
    }
    useEffect(() => {
        checkRole();
    }, [])
    return (
        <>
            {
                <BeatLoader
                    color={"#D10024"}
                    loading={isChecking}
                    cssOverride={loadingOveride}
                    size={20}
                    margin={2}
                    speedMultiplier={1}
                />
            }
            {
                isAdmin &&
                <h1>Admin DashBoard Page</h1>
            }
        </>
    )
}

export default AdminDashBoard;