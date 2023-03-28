import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./style.scss";
import { Divider } from '@mui/material';
import { useAppSelector } from 'app/hook';
import { authState } from 'redux/auth/authSlice';

const steps = ['Cài đặt thông tin cửa hàng', 'Cài đặt vận chuyển', 'Hoàn tất'];

const HorizontalLinearStepper = () => {

    const selector = useAppSelector(authState);
    const user = selector.user;
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        if (activeStep == steps.length - 1) {
            console.log("Send form")
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
                {
                    activeStep === 0 &&
                    <div>
                        <form className="profile-user-main-details-lower-left-form">
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
                                    Địa chỉ lấy hàng:
                                </label>
                                <input id="address" type="text" defaultValue={user.address} />
                            </div>
                        </form>
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
            </React.Fragment>
        </Box>
    );
}

export default HorizontalLinearStepper;