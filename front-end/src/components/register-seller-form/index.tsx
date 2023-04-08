import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./style.scss";
import { Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { authState } from 'redux/auth/authSlice';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import { registerSeller } from 'redux/seller/sellerThunk';
import { SwalAlert } from 'utils/sweet-alter';
const steps = ['Cài đặt thông tin cửa hàng', 'Cài đặt vận chuyển', 'Hoàn tất'];

type RegisterSellerValue = {
    fullname: string;
    phone: string;
    address: boolean;
};

const schema = yup.object().shape({
    fullname: yup
        .string()
        .required('Tên shop không được để trống'),
    phone: yup
        .string()
        .required('Số điện thoại không được để trống'),
    address: yup
        .string()
        .required('Địa chỉ không được để trống'),
})


const HorizontalLinearStepper = () => {

    const dispatch = useAppDispatch();
    const selector = useAppSelector(authState);
    const user = selector.user;
    const { register, handleSubmit, formState: { errors } } =
        useForm<RegisterSellerValue>({
            mode: 'onChange',
            resolver: yupResolver(schema)
        });
    const onSubmit = handleSubmit(async (data) => {
        const formData = {
            ...data,
            user_id: user.user_id
        }
        const response = await dispatch(registerSeller(formData));
        if (response.payload) {
            SwalAlert("success", (response.payload as any).data.message, "success");
        }
    });

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        if (activeStep == steps.length - 1) {
            onSubmit();
        }
        else {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} sx={{ paddingBottom: 5 }}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps} className={`${activeStep >= index && "step-title"} `}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Divider />
            <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>Bước {activeStep + 1}</Typography>
                <form onSubmit={onSubmit}>
                    {
                        activeStep === 0 &&
                        <div>
                            <div className="profile-user-main-details-lower-left-form" onSubmit={onSubmit}>
                                <div className="profile-user-main-details-lower-left-form-group">
                                    <label htmlFor="email" className="profile-user-main-details-lower-left-form-group-label">
                                        Email
                                    </label>
                                    <p>{user.email}</p>
                                </div>
                                <div className="profile-user-main-details-lower-left-form-group">
                                    <label htmlFor="fullname" className="profile-user-main-details-lower-left-form-group-label">
                                        Tên shop:
                                    </label>
                                    <input {...register("fullname")} id="fullname" type="text" defaultValue={user.fullname} />
                                </div>
                                <div className="profile-user-main-details-lower-left-form-group">
                                    <label htmlFor="phone" className="profile-user-main-details-lower-left-form-group-label">
                                        Số điện thoại:
                                    </label>
                                    <input {...register("phone")} id="phone" type="number" value={user.phone} />
                                </div>
                                <div className="profile-user-main-details-lower-left-form-group">
                                    <label htmlFor="address" className="profile-user-main-details-lower-left-form-group-label">
                                        Địa chỉ lấy hàng:
                                    </label>
                                    <input {...register("address")} id="address" type="text" defaultValue={user.address} />
                                </div>
                            </div>
                        </div>
                    }
                    {
                        activeStep === 1 &&
                        <div>
                            Hệ thống hiện tại chỉ hỗ trợ gửi hàng qua bưu điện
                        </div>
                    }
                    {
                        activeStep === 2 &&
                        <div className='my-shop-step-3'>
                            <CheckCircleOutlineTwoToneIcon className='my-shop-step-3-icon' />
                            <h2>Chúc mừng bạn đã đăng ký Bán hàng trên hệ thống thành công</h2>
                        </div>
                    }

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            className={`${activeStep && "step-btn"}`}
                        >
                            Quay lại
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}
                            className="step-btn"
                        >
                            {activeStep === steps.length - 1 ? 'Hoàn tất' : 'Tiếp theo'}
                        </Button>
                    </Box>
                </form>
            </React.Fragment>
        </Box>
    );
}

export default HorizontalLinearStepper;