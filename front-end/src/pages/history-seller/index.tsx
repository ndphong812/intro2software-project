import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "app/hook";
import { historySeller, removeProductSeller } from "redux/seller/sellerThunk";
import { authState } from "redux/auth/authSlice";

const HistorySeller = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector(authState);
  const user = selector.user;

  const [products, setProducts] = React.useState([]);
  const getData = async () => {
    const request = {
      owner_id: user.user_id,
    };
    const response = await dispatch(historySeller(request));
    setProducts(response.payload.cart);
  };

  console.log("p", products);
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "35%" }}>Tên sản phẩm</TableCell>
            <TableCell sx={{ width: "15%" }}>Hình ảnh</TableCell>
            <TableCell sx={{ width: "10%" }}>Đơn giá</TableCell>
            <TableCell sx={{ width: "10%" }}>Khách hàng</TableCell>
            <TableCell sx={{ width: "10%" }}>Số lượng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products.length > 0 &&
            products.map((product: any, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ width: "35%" }}>
                  {(product.product_id as any).name}
                </TableCell>
                <TableCell sx={{ width: "15%" }}>
                  <img
                    className="cell-image"
                    src={(product.product_id as any).image_link}
                  />
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  {(product.product_id as any).sale_price}
                </TableCell>
                <TableCell sx={{ width: "10%" }}>
                  {(product.customer_id as any).fullname}
                </TableCell>
                <TableCell sx={{ width: "10%" }}>{product.amount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistorySeller;
