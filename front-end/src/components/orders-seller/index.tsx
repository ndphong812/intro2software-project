import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./style.scss";
import { useAppDispatch, useAppSelector } from 'app/hook';
import { gelAllOrderSeller, removeProductSeller, updateStatusSeller } from 'redux/seller/sellerThunk';
import { authState } from 'redux/auth/authSlice';
import { useEffect, useState } from 'react';
import { UpdateStatusSeller } from 'redux/seller/type';

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

        if (response.payload.status) {
            setProducts(response.payload.cart)
        }
    }

    useEffect(() => {
        getData();
    }, [])

    console.log("products", products)

    const handleUpdateStatus = async (product: any, status: string) => {

        if (status !== "chờ xác nhận") {
            const request: UpdateStatusSeller = {
                owner_id: product.product_id.owner_id,
                user_id: user.user_id,
                order_id: product.order_id,
                product_id: product.product_id.product_id,
                customer_id: product.customer_id,
                status: status
            }
            const response = await dispatch(updateStatusSeller(request))
            console.log("update status", response)
            if (response.payload.status === "success") {
                getData();
            }
        }
    }

    console.log("pro", products)
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "30%" }}>Thông tin khách hàng</TableCell>
                        <TableCell sx={{ width: "30%" }}>Tên sản phẩm</TableCell>
                        <TableCell sx={{ width: "10%" }}>Số lượng</TableCell>
                        <TableCell sx={{ width: "10%" }}>Trạng thái</TableCell>
                        <TableCell sx={{ width: "20%" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products && products.length > 0 && products.map((product: any, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ width: "30%" }}>
                                <b>Nguyễn Đình Phong</b>
                                <p style={{ margin: "6px 0px" }}>Khoa Công nghệ thông tin, Trường ĐH Khoa Học Tự Nhiên</p>
                                <i>{product.note}</i>
                            </TableCell>
                            <TableCell sx={{ width: "30%" }}>{product.product_id.name}</TableCell>
                            <TableCell sx={{ width: "10%" }}>{product.amount}</TableCell>
                            <TableCell sx={{ width: "10%" }}>{product.status}</TableCell>
                            <TableCell sx={{ width: "20%" }}>
                                <select style={{ padding: "6px 10px" }}
                                    onChange={(event) => handleUpdateStatus(product, event.target.value)}
                                >
                                    {
                                        product.status == "chờ xác nhận"
                                        &&
                                        <option value="chờ xác nhận"
                                            selected={product.status == "chờ xác nhận"}
                                        >
                                            Chờ xác nhận
                                        </option>
                                    }

                                    <option value="đang giao"
                                        selected={product.status == "đang giao"}
                                    >
                                        Đang giao
                                    </option>
                                    <option value="đã giao"
                                        selected={product.status == "đã giao"}
                                    >
                                        Đã giao
                                    </option>
                                </select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default OrderSeller;