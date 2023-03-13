import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "app/hook";
import axios from "axios";
import Footer from "components/footer";
import Header from "components/header";
import { HeaderAuth } from "components/header-auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { authState } from "redux/auth/authSlice";
import { forgotPassword } from "redux/auth/authThunk";
import { loadingOveride } from "utils/loading";
import { SwalAlert } from "utils/sweet-alter";
import * as yup from 'yup'
import "./style.scss";

type ForgotPasswordValue = {
    email: string;
    password: string;
    verifyPassword: string;
};

const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email không được để trống'),
})

const ForgotPassword = () => {

    const selector = useAppSelector(authState);
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } =
        useForm<ForgotPasswordValue>({
            mode: 'onChange',
            resolver: yupResolver(schema)
        });
    const onSubmit = handleSubmit(async (data) => {
        const response = await dispatch(forgotPassword(data.email));
        if (response.payload && (response.payload as any).status === 200) {
            SwalAlert('Success', (response.payload as any).data.message, 'success');
        }
        else {
            SwalAlert("Failed", (response as any).error.message, "error");
        }
    });

    return (
        <>
            <HeaderAuth />
            <div className="forgot-password">
                <div className="container">
                    <div className="forgot-password-main">
                        <form className="forgot-password-main-form" onSubmit={onSubmit}>
                            <h3 className="login-main-form-title">Quên mật khẩu</h3>
                            <div className="forgot-password-main-form-group">
                                <div className="forgot-password-main-form-group-infor">
                                    <label className="forgot-password-main-form-group-infor-title" htmlFor="email">Nhập email của bạn:</label>
                                    <input {...register("email")} className="forgot-password-main-form-group-infor-input" type="email" id="email" />
                                </div>
                                {errors.email && <p className="forgot-password-main-form-group-error">{errors.email.message}</p>}
                            </div>
                            <div className="forgot-password-main-form-submit">
                                <p>Mật khẩu mới sẽ được gửi về email của bạn.</p>
                                <button className="forgot-password-main-form-submit-button" type="submit">Gửi</button>
                            </div>
                            <div className="forgot-password-main-form-submit-login">
                                <p>
                                    <Link to="/auth/login" replace={false} className="forgot-password-main-form-submit-link">Quay lại đăng nhập</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {
                <BeatLoader
                    color={"#D10024"}
                    loading={Boolean(selector.isLoading)}
                    cssOverride={loadingOveride}
                    size={20}
                    margin={2}
                    speedMultiplier={1}
                />
            }
            <Footer />
        </>
    )
}
export default ForgotPassword;