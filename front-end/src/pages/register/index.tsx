import { useForm, Resolver } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Footer from "../../components/footer";
import "./style.scss";
import { Link } from 'react-router-dom';
import { SwalAlert } from 'utils/sweet-alter';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { registerUser } from 'redux/auth/authThunk';
import { authState } from 'redux/auth/authSlice';
import { ClipLoader } from 'react-spinners';
import BeatLoader from 'react-spinners/BeatLoader';
import { loadingOveride } from 'utils/loading';
import Header from 'components/header';

type RegisterValue = {
    email: String;
    password: String;
    verifyPassword: String;
    acceptProvision: Boolean;
};

const schema = yup.object().shape({
    email: yup
        .string()
        .required('Email không được để trống'),
    password: yup
        .string()
        .min(6)
        .max(24),
    verifyPassword: yup.string()
        .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không chính xác.'),
    acceptProvision: yup.boolean()
        .required()
        .oneOf([true])
})

const Register = () => {

    const dispatch = useAppDispatch();
    const selector = useAppSelector(authState);
    const { register, handleSubmit, formState: { errors } } =
        useForm<RegisterValue>({
            mode: 'onChange',
            resolver: yupResolver(schema)
        });
    const onSubmit = handleSubmit(async (data) => {
        const request = {
            email: data.email,
            password: data.password
        }
        const response = await dispatch(registerUser(request));
        if (response.payload && (response.payload as any).status === 'success') {
            SwalAlert('Success', response.payload.message, 'success');
        }
        else {
            SwalAlert("Failed", (response as any).error.message, "error");
        }
    });

    return (
        <>
            <Header />
            <div className="register">
                <div className="container">
                    <div className="register-main">
                        <form className="register-main-form" onSubmit={onSubmit}>
                            <h3 className='register-main-form-title'>Đăng ký</h3>
                            <div className="register-main-form-group">
                                <div className="register-main-form-group-infor">
                                    <label className="register-main-form-group-infor-title" htmlFor="email">Email:</label>
                                    <input {...register("email")} className="register-main-form-group-infor-input" type="email" id="email" />
                                </div>
                                {errors.email && <p className="register-main-form-group-error">{errors.email.message}</p>}
                            </div>
                            <div className="register-main-form-group">
                                <div className="register-main-form-group-infor">
                                    <label className="register-main-form-group-infor-title" htmlFor="password">Mật khẩu:</label>
                                    <input {...register("password")} className="register-main-form-group-infor-input" type="password" id="password" />
                                </div>
                                {errors.password && <p className="register-main-form-group-error">
                                    Mật khẩu phải từ 6-24 kí tự.
                                </p>}
                            </div>
                            <div className="register-main-form-group">
                                <div className="register-main-form-group-infor">
                                    <label className="register-main-form-group-infor-title" htmlFor="verify-password">Nhập lại mật khẩu:</label>
                                    <input {...register("verifyPassword")} className="register-main-form-group-infor-input" type="password" id="verify-password" />
                                </div>
                                {errors.verifyPassword && <p className="register-main-form-group-error">{errors.verifyPassword.message}</p>}
                            </div>
                            <div className="register-main-form-provision">
                                <input {...register("acceptProvision")}
                                    className={`register-main-form-provision-check-box ${errors.acceptProvision && "register-main-form-provision-check-box-hightlight"} `}
                                    type="checkbox" />
                                <p className="register-main-form-provision-check-title">Tôi đồng ý với
                                    <a href="/" className="register-main-form-group-infor-link"> điều khoản</a> của trang web</p>
                            </div>
                            <div className="register-main-form-submit">
                                <div className="register-main-form-submit-login">
                                    <p>Bạn đã có tài khoản? <Link to="/auth/login" className="register-main-form-submit-link">Đăng nhập</Link></p>
                                </div>
                                <button className="register-main-form-submit-button" type="submit">Đăng ký</button>
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
export default Register;