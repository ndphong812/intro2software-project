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
import { removeProductSeller } from 'redux/seller/sellerThunk';
import { authState } from 'redux/auth/authSlice';

type Props = {
    products: any,
    getData: () => void,
    handleOpen: () => void,
    setProductEdit: (product: Product) => void,
}
const ProductListSeller: React.FC<Props> = ({ products, getData, handleOpen, setProductEdit }) => {

    const dispatch = useAppDispatch();
    const selector = useAppSelector(authState);
    const user = selector.user;
    const handleRemoveProduct = async (product_id: string) => {
        const response: any = await dispatch(removeProductSeller({
            owner_id: user.user_id,
            user_id: user.user_id,
            product_id: product_id
        }));

        if (response && response.payload.status == 200) {
            getData();
        }
    }

    const handleEdit = (product: Product) => {
        handleOpen();
        setProductEdit(product);
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "35%" }}>Tên sản phẩm</TableCell>
                        <TableCell sx={{ width: "15%" }}>Hình ảnh</TableCell>
                        <TableCell sx={{ width: "10%" }}>Đơn giá</TableCell>
                        <TableCell sx={{ width: "10%" }}>Đã bán</TableCell>
                        <TableCell sx={{ width: "10%" }}>Tồn kho</TableCell>
                        <TableCell sx={{ width: "20%" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products && products.length > 0 && products.map((product: Product) => (
                        <TableRow
                            key={product.product_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ width: "35%" }}>
                                {product.name}
                            </TableCell>
                            <TableCell sx={{ width: "15%" }}>
                                <img className='cell-image' src={product.image_link} />
                            </TableCell>
                            <TableCell sx={{ width: "10%" }}>{product.sale_price}</TableCell>
                            <TableCell sx={{ width: "10%" }}>{product.sold_amount}</TableCell>
                            <TableCell sx={{ width: "10%" }}>{product.stock}</TableCell>
                            <TableCell sx={{ width: "20%" }}>
                                <div className="manage-product-list-btns">
                                    <div className='manage-product-list-btns-child' onClick={() => handleEdit(product)}>
                                        Chỉnh sửa
                                    </div>
                                    <div className='manage-product-list-btns-child' onClick={() => handleRemoveProduct(product.product_id)}>
                                        Xóa
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

export default ProductListSeller;