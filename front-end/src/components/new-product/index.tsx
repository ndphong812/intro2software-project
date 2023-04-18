import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import "./style.scss";
import ImageUploader from 'components/upload-image';
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { authState } from 'redux/auth/authSlice';
import { addProductSeller, updateProductSeller } from 'redux/seller/sellerThunk';
import { AddProductSeller } from 'redux/seller/type';
import { Product } from 'redux/product/type';
import { useEffect, useState } from 'react';
import { SwalAlert } from 'utils/sweet-alter';


const schema = yup.object().shape({
    name: yup
        .string()
        .required('Tên sản phẩm không được để trống'),
    detail: yup
        .string()
        .required('Chi tiết sản phẩm không được để trống'),
    stock: yup
        .string()
        .required('Số lượng tồn kho không được để trống'),
    original_price: yup
        .string()
        .required('Giá không được để trống'),
    sale_price: yup
        .string(),
    type: yup
        .string()
        .required('Type phải là điện thoại/tablet/laptop'),
    brand: yup
        .string()
        .required('Thương hiệu không được để trống'),
})

type Props = {
    product: Product,
    isOpen: boolean,
    handleOpen: () => void,
    handleClose: () => void,
    getData: () => void,
}

const NewEditProduct: React.FC<Props> = ({ product, isOpen, handleOpen, handleClose, getData }) => {

    // const [name, setName] = useState(product.name);
    // const [detail, setDetail] = useState(product.detail);
    // const [original_price, setOriginalPrice] = useState(product.original_price);
    // const [sale_price, setSalePrice] = useState(product.sale_price);
    // const [stock, setStock] = useState(product.stock);
    // const [type, setType] = useState(product.type);
    // const [brand, setBrand] = useState(product.brand);

    const selector = useAppSelector(authState);
    const user = selector.user;
    const dispatch = useAppDispatch();
    const [imageLink, setImageLink] = React.useState(product.image_link || "");
    const { register, handleSubmit, formState: { errors }, watch } =
        useForm<AddProductSeller>({
            mode: 'onChange',
            resolver: yupResolver(schema)
        });
    const onSubmit = handleSubmit(async (data) => {
        const editData: any = {
            ...data,
            product_id: product.product_id,
            user_id: user.user_id,
            owner_id: user.user_id,
            image_link: imageLink
        }

        const response = await dispatch(updateProductSeller(editData));
        if (response.payload.status === 'success') {
            SwalAlert("Thành công", response.payload.message, "success");
        }
        handleClose();
        getData();
    });

    const handleSetImage = (link: string) => {
        setImageLink(link);
    }

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose} >
                <DialogTitle>Thông tin sản phẩm</DialogTitle>
                <DialogContent >
                    <DialogContentText>
                        Sau khi ấn Hoàn tất, sản phẩm của bạn sẽ được gửi đến cho Admin, và chờ duyệt.
                    </DialogContentText>
                    <form onSubmit={onSubmit} className='new-product-content'>
                        <input defaultValue={product.name} {...register("name")} type="text" placeholder='Tên sản phẩm' />
                        <TextareaAutosize
                            {...register("detail")}
                            placeholder="Chi tiết sản phẩm"
                            style={{ width: '100%' }}
                            minRows={3}
                            defaultValue={product.detail}
                        />
                        <input defaultValue={product.original_price} {...register("original_price")} type="number" placeholder='Giá gốc' />
                        <input defaultValue={product.sale_price} {...register("sale_price")} type="number" placeholder='Giá sale' />
                        <input defaultValue={product.stock} {...register("stock")} type="number" placeholder='Số lượng trong kho' />
                        <input defaultValue={product.type} {...register("type")} type="text" placeholder='Loại mặt hàng' />
                        <input defaultValue={product.brand} {...register("brand")} type="text" placeholder='Thương hiệu' />
                        <ImageUploader defaultImage={product.image_link} setImageLink={handleSetImage} />
                        <DialogActions>
                            <Button onClick={handleClose}>Đóng</Button>
                            <Button type='submit'>Hoàn tất</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}

export default NewEditProduct;