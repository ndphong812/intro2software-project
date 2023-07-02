import { useAppDispatch, useAppSelector } from "app/hook";
import ImageUploader from "components/upload-image";
import { authState } from "redux/auth/authSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "./style.scss";
import { updateProfile } from "redux/users/usersThunk";
import { useState } from "react";
import Swal from "sweetalert2";

const ApplicationPage = () => {
  const selector = useAppSelector(authState);
  const user = selector.user;
  const [imageUrl, setImageUrl] = useState(user.avatar_link);

  const handleSetImage = (url: string) => {
    setImageUrl(url);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<any>({
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(async (data) => {
    const formData = {
      ...data,
      user_id: user.user_id,
      avatar_link: imageUrl,
    };
    const response = await dispatch(updateProfile(formData));
    Swal.fire("Hoàn thành!", "Cập nhật thông tin thành công", "success");
  });

  return (
    <>
      {Object.keys(user).length > 0 && (
        <div className="profile-user-main-details">
          <div className="profile-user-main-details-upper">
            <h3 className="profile-user-main-details-upper-title">
              Hồ Sơ Của Tôi
            </h3>
            <p className="profile-user-main-details-upper-detail">
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </p>
          </div>
          <div className="profile-user-main-details-lower">
            <div className="profile-user-main-details-lower-left">
              <form
                className="profile-user-main-details-lower-left-form"
                onSubmit={onSubmit as any}
              >
                <div className="profile-user-main-details-lower-left-form-group">
                  <label
                    htmlFor="email"
                    className="profile-user-main-details-lower-left-form-group-label"
                  >
                    Email
                  </label>
                  <p>{user.email}</p>
                </div>
                <div className="profile-user-main-details-lower-left-form-group">
                  <label
                    htmlFor="fullname"
                    className="profile-user-main-details-lower-left-form-group-label"
                  >
                    Họ tên:
                  </label>
                  <input
                    id="fullname"
                    type="text"
                    defaultValue={user.fullname}
                    {...register("fullname")}
                  />
                </div>
                <div className="profile-user-main-details-lower-left-form-group">
                  <label
                    htmlFor="phone"
                    className="profile-user-main-details-lower-left-form-group-label"
                  >
                    Số điện thoại:
                  </label>
                  <input
                    id="phone"
                    type="number"
                    defaultValue={user.phone}
                    {...register("phone")}
                  />
                </div>
                <div className="profile-user-main-details-lower-left-form-group">
                  <label
                    htmlFor="address"
                    className="profile-user-main-details-lower-left-form-group-label"
                  >
                    Địa chỉ:
                  </label>
                  <input
                    id="address"
                    type="text"
                    defaultValue={user.address}
                    {...register("address")}
                  />
                </div>
                <button
                  className="profile-user-main-details-lower-left-form-submit"
                  type="submit"
                >
                  Lưu
                </button>
              </form>
            </div>
            <div className="profile-user-main-details-lower-right">
              <ImageUploader
                user={user}
                isAvatar
                setImageLink={handleSetImage}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationPage;
