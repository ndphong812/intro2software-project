import { useForm, Resolver } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Footer from "../../components/footer";
import "./style.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, verifyLoginToken } from 'redux/auth/authThunk';
import { AuthRequest } from 'redux/auth/type';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { authState } from 'redux/auth/authSlice';
import { SwalAlert } from 'utils/sweet-alter';
import Header from 'components/header';
import BeatLoader from 'react-spinners/BeatLoader';
import { loadingOveride } from 'utils/loading';
type RegisterValue = {
    email: string;
    password: string;
    verifyPassword: string;
};

const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email không được để trống'),
    password: yup
        .string()
        .required('Mật khẩu không được để trống'),
})

const Login = () => {

    const dispatch = useAppDispatch();
    const selector = useAppSelector(authState);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } =
        useForm<RegisterValue>({
            mode: 'onChange',
            resolver: yupResolver(schema)
        });
    const onSubmit = handleSubmit(async (data) => {

        const request: AuthRequest = {
            email: data.email,
            password: data.password
        }
        const response = await dispatch(loginUser(request));
        console.log('response', response);
        if (response.payload && (response.payload as any).status === 200) {
            const token = localStorage.getItem("access_token");
            const response = await dispatch(verifyLoginToken(token as String));
            if (response.payload && (response.payload as any).status === 200) {
                navigate('/');
            }
            else {
                SwalAlert("Failed", (response as any).error.message, "error");
            }
        }
        else {
            SwalAlert("Failed", (response as any).error.message, "error");
        }
    });

    return (
        <>
            <Header />
            <div className="login">
                <div className="container">
                    <div className="login-main">
                        <form className="login-main-form" onSubmit={onSubmit}>
                            <div className="login-main-form-group">
                                <div className="login-main-form-group-infor">
                                    <label className="login-main-form-group-infor-title" htmlFor="email">Email:</label>
                                    <input {...register("email")} className="login-main-form-group-infor-input" type="email" id="email" />
                                </div>
                                {errors.email && <p className="login-main-form-group-error">{errors.email.message}</p>}
                            </div>
                            <div className="login-main-form-group">
                                <div className="login-main-form-group-infor">
                                    <label className="login-main-form-group-infor-title" htmlFor="password">Mật khẩu:</label>
                                    <input {...register("password")} className="login-main-form-group-infor-input" type="password" id="password" />
                                </div>
                                {errors.password &&
                                    <p className="login-main-form-group-error">
                                        {errors.password.message}
                                    </p>
                                }
                            </div>
                            <div className="login-main-form-submit">
                                <div className="login-main-form-submit-login">
                                    <p>Chưa có tài khoản?
                                        <Link to="/auth/register" replace={false} className="login-main-form-submit-link">Đăng ký</Link>
                                    </p>
                                    <p>
                                        <Link to="/auth/forgot-password" replace={false} className="login-main-form-submit-link">Quên mật khẩu</Link>
                                    </p>
                                </div>
                                <button className="login-main-form-submit-button" type="submit">Đăng nhập</button>
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
export default Login;