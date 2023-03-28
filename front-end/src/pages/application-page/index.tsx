import { useAppSelector } from "app/hook";
import ImageUploader from "components/upload-image"
import { authState } from "redux/auth/authSlice";
import "./style.scss";

const ApplicationPage = () => {

    const selector = useAppSelector(authState);
    const user = selector.user;
    return (
        <>
            {
                Object.keys(user).length > 0 &&
                <div className="profile-user-main-details">
                    <div className="profile-user-main-details-upper">
                        <h3 className="profile-user-main-details-upper-title">Hồ Sơ Của Tôi</h3>
                        <p className="profile-user-main-details-upper-detail">
                            Quản lý thông tin hồ sơ để bảo mật tài khoản
                        </p>
                    </div>
                    <div className="profile-user-main-details-lower">
                        <div className="profile-user-main-details-lower-left">
                            <form className="profile-user-main-details-lower-left-form">
                                <div className="profile-user-main-details-lower-left-form-group">
                                    <label htmlFor="email" className="profile-user-main-details-lower-left-form-group-label">
                                        Email
                                    </label>
                                    <p>{user.email}</p>
                                </div>
                                <div className="profile-user-main-details-lower-left-form-group">
                                    <label htmlFor="fullname" className="profile-user-main-details-lower-left-form-group-label">
                                        Họ tên:
                                    </label>
                                    <input id="fullname" type="text" defaultValue={user.fullname} />
                                </div>
                                <div className="profile-user-main-details-lower-left-form-group">
                                    <label htmlFor="phone" className="profile-user-main-details-lower-left-form-group-label">
                                        Số điện thoại:
                                    </label>
                                    {/* <div className="profile-user-main-details-lower-left-form-group-infor">
                                    <span>0387672029</span>
                                    <a href="https://">
                                        Thay đổi
                                    </a>
                                </div> */}
                                    <input id="phone" type="number" value={user.phone} />
                                </div>
                                <div className="profile-user-main-details-lower-left-form-group">
                                    <label htmlFor="address" className="profile-user-main-details-lower-left-form-group-label">
                                        Địa chỉ:
                                    </label>
                                    <input id="address" type="text" defaultValue={user.address} />
                                </div>
                                <button className="profile-user-main-details-lower-left-form-submit">Lưu</button>
                            </form>
                        </div>
                        <div className="profile-user-main-details-lower-right">
                            <ImageUploader user={user} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ApplicationPage;