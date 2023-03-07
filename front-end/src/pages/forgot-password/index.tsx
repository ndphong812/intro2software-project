import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Footer from "components/footer";
import Header from "components/header";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
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

    const { register, handleSubmit, formState: { errors } } =
        useForm<ForgotPasswordValue>({
            mode: 'onChange',
            resolver: yupResolver(schema)
        });
    const onSubmit = handleSubmit(async (data) => {
        console.log('data', data.email);
        const response = await axios.post('http://localhost:5000/auth/forgot-password', {
            email: data.email
        });
        console.log('response', response);
    });

    return (
        <>
            <Header />
            <div className="forgot-password">
                <div className="container">
                    <div className="forgot-password-main">
                        <form className="forgot-password-main-form" onSubmit={onSubmit}>
                            <div className="forgot-password-main-form-group">
                                <div className="forgot-password-main-form-group-infor">
                                    <label className="forgot-password-main-form-group-infor-title" htmlFor="email">Nhập email của bạn:</label>
                                    <input {...register("email")} className="forgot-password-main-form-group-infor-input" type="email" id="email" />
                                </div>
                                {errors.email && <p className="forgot-password-main-form-group-error">{errors.email.message}</p>}
                            </div>

                            <div className="forgot-password-main-form-submit">
                                <div className="forgot-password-main-form-submit-login">
                                    <p>
                                        <Link to="/auth/login" replace={false} className="forgot-password-main-form-submit-link">Quay lại đăng nhập</Link>
                                    </p>
                                </div>
                                <button className="forgot-password-main-form-submit-button" type="submit">Gửi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default ForgotPassword;