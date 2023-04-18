import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./style.scss";
import { Product } from 'redux/product/type';
import { useAppDispatch, useAppSelector } from 'app/hook';
import { gelAllOrderSeller, removeProductSeller } from 'redux/seller/sellerThunk';
import { authState } from 'redux/auth/authSlice';
import { useEffect, useState } from 'react';

const OrderSeller = () => {

    const dispatch = useAppDispatch();
    const selector = useAppSelector(authState);
    const user = selector.user;
    const [products, setProducts] = useState([]);

    const getData = async () => {
        const response = await dispatch(gelAllOrderSeller({
            owner_id: user.user_id,
            user_id: user.user_id,
        }))
        console.log("response1", response)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "30%" }}>Thông tin khách hàng</TableCell>
                        <TableCell sx={{ width: "10%" }}>Số điện thoại</TableCell>
                        <TableCell sx={{ width: "30%" }}>Tên sản phẩm</TableCell>
                        <TableCell sx={{ width: "10%" }}>Số lượng</TableCell>
                        <TableCell sx={{ width: "20%" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products && products.length > 0 && products.map((product: Product) => (
                        <TableRow
                            key={product.product_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ width: "30%" }}>
                                {product.name}
                            </TableCell>
                            <TableCell sx={{ width: "10%" }}>{product.sale_price}</TableCell>
                            <TableCell sx={{ width: "30%" }}>{product.sold_amount}</TableCell>
                            <TableCell sx={{ width: "10%" }}>{product.stock}</TableCell>
                            <TableCell sx={{ width: "20%" }}>
                                <div className="manage-product-list-btns">
                                    <div className='manage-product-list-btns-child'>
                                        Xác nhận
                                    </div>
                                    <div className='manage-product-list-btns-child'>
                                        Từ chối
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default OrderSeller;