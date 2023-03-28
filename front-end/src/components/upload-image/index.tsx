import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ProgressBar from "@ramonak/react-progress-bar";
import 'firebase/storage';
import firebaseStorage from "./firebase"
import {
    getDownloadURL,
    ref,
    uploadBytesResumable
} from "firebase/storage";
import { SwalAlert } from 'utils/sweet-alter';
import { Avatar } from '@mui/material';
import "./style.scss";
import { User } from 'redux/auth/type';

type Props = {
    user: User;
}

const ImageUploader: React.FC<Props> = ({ user }: Props) => {
    const [imageUrl, setImageUrl] = useState<string>(user.avatar_link);
    const [percent, setPercent] = useState(0);

    const onDrop = (acceptedFiles: File[]) => {
        if (!acceptedFiles.length) {
            SwalAlert("Opps", "Vui lòng chọn 1 ảnh", "error");
        }
        else {
            const file = acceptedFiles[0];
            if (file.type !== "image/png" && file.type !== "image/jpeg") {
                SwalAlert("Opps", "Vui lòng chỉ chọn file ảnh PNG hoặc JPEG", "error");
                return;
            }
            const storageRef = ref(firebaseStorage, `/files/${file.name}`)
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setImageUrl(url);
                    });
                }
            );
        }
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} accept=".png,.jpg" />
            <Avatar className='upload-img' sx={{ width: 100, height: 100 }} src={imageUrl as string} alt="Uploaded image" />
            {
                percent > 0 && percent < 100 &&
                <ProgressBar
                    completed={60}
                    bgColor="#D10024"
                    baseBgColor="#E0E0E0"
                    height="15px"
                    labelAlignment="center"
                />
            }
            <button className='upload-img-button'>Chọn ảnh</button>
            <p className='upload-img-note'>Định dạng: .PNG, .JPG</p>
        </div>
    );
}

export default ImageUploader;