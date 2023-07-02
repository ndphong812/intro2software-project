import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const AdminManageUsers = () => {

    
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: "10%" }}>Id</TableCell>
                            <TableCell sx={{ width: "15%" }}>Họ tên</TableCell>
                            <TableCell sx={{ width: "15%" }}>Email</TableCell>
                            <TableCell sx={{ width: "20%" }}>Địa chỉ</TableCell>
                            <TableCell sx={{ width: "10%" }}>Vai trò</TableCell>
                            <TableCell sx={{ width: "10%" }}>Trạng thái</TableCell>
                            <TableCell sx={{ width: "20%" }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {products && products.length > 0 && products.map((product: Product) => (
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
                                        <div className='manage-product-list-btns-child'>
                                            Chỉnh sửa
                                        </div>
                                        <div className='manage-product-list-btns-child'>
                                            Xóa
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    )
}

export default AdminManageUsers;