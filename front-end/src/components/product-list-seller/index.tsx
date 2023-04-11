import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./style.scss";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    fat1: number
) {
    return { name, calories, fat, carbs, protein, fat1 };
}

const rows = [
    createData('IPhone 14 Promax', 159, 6.0, 24, 4.0, 1),
    createData('IPhone 14 Promax', 159, 6.0, 24, 4.0, 1),
    createData('IPhone 14 Promax', 159, 6.0, 24, 4.0, 1),
    createData('IPhone 14 Promax', 159, 6.0, 24, 4.0, 1),
    createData('IPhone 14 Promax', 159, 6.0, 24, 4.0, 1),
];

const ProductListSeller = () => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "30%" }}>Tên sản phẩm</TableCell>
                        <TableCell sx={{ width: "15%" }}>Hình ảnh</TableCell>
                        <TableCell sx={{ width: "20%" }}>Đơn giá</TableCell>
                        <TableCell sx={{ width: "10%" }}>Đã bán</TableCell>
                        <TableCell sx={{ width: "10%" }}>Tồn kho</TableCell>
                        <TableCell sx={{ width: "15%" }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell sx={{ width: "30%" }}>
                                {row.name}
                            </TableCell>
                            <TableCell sx={{ width: "15%" }}>
                                <img className='cell-image' src="https://lh3.googleusercontent.com/n2_m2bxNsT-FdBu0cCWZg5ffkiM1pxFl4-v_PD6M8-x6HNl8eL0PKG0dYnvI1Prs8HKddEBREwiWApcSlcE=w500-rw" />
                            </TableCell>
                            <TableCell sx={{ width: "20%" }}>{row.fat}</TableCell>
                            <TableCell sx={{ width: "10%" }}>{row.carbs}</TableCell>
                            <TableCell sx={{ width: "10%" }}>{row.protein}</TableCell>
                            <TableCell sx={{ width: "15%" }}>{row.fat1}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

export default ProductListSeller;