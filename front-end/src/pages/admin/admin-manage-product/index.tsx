import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "app/hook";
import { removeUser } from "redux/users/usersThunk";
import { authState } from "redux/auth/authSlice";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import {
  acceptProduct,
  getAllProduct,
  getWaitingProducts,
} from "redux/product/productThunk";
import { removeProductSeller } from "redux/seller/sellerThunk";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976D2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminManageProducts() {
  const dispatch = useAppDispatch();

  const selector = useAppSelector(authState);

  const user = selector.user;

  const [products, setProducts] = useState<any>([]);

  const [waitingProducts, setWaitingProducts] = useState<any>([]);

  const getData = async () => {
    const response = await dispatch(getAllProduct(1));
    const pages = response.payload.numberOfPages;
    let products: any = [];
    for (let i = 1; i <= pages; i++) {
      const response1 = await dispatch(getAllProduct(i));
      response1.payload.products.forEach((element: any) => {
        products.push(element);
      });
    }
    setProducts(products);

    const request = {
      emailAdmin: user.email,
      idAdmin: user.user_id,
    };

    const waitingReponse = await dispatch(getWaitingProducts(request));
    setWaitingProducts(waitingReponse.payload.products);
  };

  const handleRemove = (product: any) => {
    Swal.fire({
      title: "Xác nhận",
      text: "Xóa sản phẩm này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        const response = dispatch(
          removeProductSeller({
            owner_id: product.owner_id,
            user_id: user.user_id,
            product_id: product.product_id,
          })
        );
        Swal.fire("Hoàn thành!", "Đã xóa sản phẩm này", "success");
        getData();
      }
    });
  };

  const handleAccept = (product: any) => {
    Swal.fire({
      title: "Xác nhận",
      text: "Duyệt sản phẩm này",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Hủy bỏ",
    }).then((result) => {
      if (result.isConfirmed) {
        const request = {
          emailAdmin: user.email,
          idAdmin: user.user_id,
          listProduct: [
            {
              product_id: product.product_id,
              owner_id: product.owner_id,
            },
          ],
        };
        const response = dispatch(acceptProduct(request));
        Swal.fire("Hoàn thành!", "Đã duyệt", "success");
        getData();
      }
    });
  };

  const [dialog, setDialog] = useState<any>("");

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        <h3>Sản phẩm chờ duyệt</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: "10%" }}>STT</StyledTableCell>
                <StyledTableCell>Tên sản phẩm</StyledTableCell>
                <StyledTableCell>Hình ảnh</StyledTableCell>
                <StyledTableCell>Số lượng</StyledTableCell>
                <StyledTableCell>Giá gốc</StyledTableCell>
                <StyledTableCell>Ưu đãi còn</StyledTableCell>
                <StyledTableCell>Thao tác</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {waitingProducts.map((product: any, index: number) => (
                <StyledTableRow key={index}>
                  <StyledTableCell sx={{ width: "10%" }}>
                    {index}
                  </StyledTableCell>
                  <StyledTableCell>{product.name}</StyledTableCell>
                  <StyledTableCell>
                    <img className="cell-image" src={product.image_link} />
                  </StyledTableCell>
                  <StyledTableCell>{product.stock}</StyledTableCell>
                  <StyledTableCell>{product.original_price}</StyledTableCell>
                  <StyledTableCell>{product.sale_price}</StyledTableCell>
                  <StyledTableCell>
                    <div style={{ display: "flex", gap: "16px" }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleAccept(product)}
                      >
                        Duyệt
                      </Button>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <h3>Tất cả sản phẩm</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "10%" }}>STT</StyledTableCell>
              <StyledTableCell>Tên sản phẩm</StyledTableCell>
              <StyledTableCell>Hình ảnh</StyledTableCell>
              <StyledTableCell>Số lượng</StyledTableCell>
              <StyledTableCell>Giá gốc</StyledTableCell>
              <StyledTableCell>Ưu đãi còn</StyledTableCell>
              <StyledTableCell>Thao tác</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell sx={{ width: "10%" }}>{index}</StyledTableCell>
                <StyledTableCell>{product.name}</StyledTableCell>
                <StyledTableCell>
                  <img className="cell-image" src={product.image_link} />
                </StyledTableCell>
                <StyledTableCell>{product.stock}</StyledTableCell>
                <StyledTableCell>{product.original_price}</StyledTableCell>
                <StyledTableCell>{product.sale_price}</StyledTableCell>
                <StyledTableCell>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleRemove(product)}
                    >
                      Xóa
                    </Button>
                  </div>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
