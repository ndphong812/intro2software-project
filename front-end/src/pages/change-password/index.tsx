import Swal from "sweetalert2";
import "./style.scss";
import * as yup from "yup";
import { register } from "numeral";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "app/hook";
import { updateProfile } from "redux/users/usersThunk";
import { authState } from "redux/auth/authSlice";

type ForgotPasswordValue = {
  password: string;
  newPassword: string;
  verifyNewPassword: string;
};

const schema = yup.object().shape({
  password: yup.string().required("Mật khẩu không được để trống"),
  newPassword: yup.string().min(6).max(24),
  verifyNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Mật khẩu xác nhận không chính xác."),
});

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValue>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const selector = useAppSelector(authState);
  const user = selector.user;
  const dispatch = useAppDispatch();
  const onSubmit = handleSubmit((data) => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn xác nhận đổi mật khẩu?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy bỏ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = {
          user_id: user.user_id,
          hashpass: data.newPassword,
        };
        const response = await dispatch(updateProfile(formData));
        Swal.fire("Hoàn thành!", "Đổi mật khẩu thành công", "success");
      }
    });
  });

  return (
    <>
      <div className="profile-user-main-details">
        <div className="profile-user-main-details-upper">
          <h3 className="profile-user-main-details-upper-title">
            Đổi Mật Khẩu
          </h3>
          <p className="profile-user-main-details-upper-detail">
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
          </p>
        </div>
        <div className="profile-user-main-details-lower">
          <div className="profile-user-main-details-lower-left">
            <form
              className="profile-user-main-details-lower-left-form"
              onSubmit={onSubmit}
            >
              <div className="profile-user-main-details-lower-left-form-group">
                <label
                  htmlFor="password"
                  className="profile-user-main-details-lower-left-form-group-label"
                >
                  Mật khẩu hiện tại:
                </label>
                <input
                  {...register("password")}
                  id="password"
                  type="password"
                />
              </div>
              <div className="profile-user-main-details-lower-left-form-group">
                <label
                  htmlFor="new-password"
                  className="profile-user-main-details-lower-left-form-group-label"
                >
                  Mật khẩu mới:
                </label>
                <input
                  {...register("newPassword")}
                  id="new-password"
                  type="password"
                />
              </div>
              <div className="profile-user-main-details-lower-left-form-group">
                <label
                  htmlFor="verify-password"
                  className="profile-user-main-details-lower-left-form-group-label"
                >
                  Xác nhận mật khẩu mới:
                </label>
                <input
                  {...register("verifyNewPassword")}
                  id="verify-password"
                  type="password"
                />
              </div>
              <button className="profile-user-main-details-lower-left-form-submit">
                Lưu
              </button>
            </form>
          </div>
          <div className="profile-user-main-details-lower-right">
            {/* <p className="forgot-password-button" onClick={() => handleForgotPassword()}>Quên mật khẩu</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
