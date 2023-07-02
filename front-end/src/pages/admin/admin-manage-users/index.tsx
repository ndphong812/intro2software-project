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
import {
  createUser,
  editUser,
  getAllUsers,
  removeUser,
} from "redux/users/usersThunk";
import { authState } from "redux/auth/authSlice";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { SwalAlert } from "utils/sweet-alter";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminManageUsers() {
  const dispatch = useAppDispatch();

  const selector = useAppSelector(authState);

  const user = selector.user;

  const [users, setUsers] = useState<any>([]);

  console.log("users", users);
  const getData = async () => {
    const request = {
      emailAdmin: user.email,
      idAdmin: user.user_id,
    };
    const response = await dispatch(getAllUsers(request));
    setUsers((response.payload as any).data.users);
  };

  const [open, setOpen] = React.useState(false);

  const [id, setId] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Xác nhận",
      text: "Xóa tài khoản này ?",
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
          idUser: id,
        };
        const response = dispatch(removeUser(request));
        Swal.fire("Hoàn thành!", "Đã xóa người dùng này", "success");
        getData();
      }
    });
  };

  const [dialog, setDialog] = useState<any>("");

  const handleOpenUpdateForm = (user: any) => {
    setOpen(true);
    setId(user.user_id);
    setEmail(user.email);
    setPassword(user.password);
    setRole(user.role);
    setDialog("edit");
  };

  const handleClickOpen = () => {
    setOpen(true);
    setDialog("new");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    let request: any = {
      email: email,
      password: password,
      role: role,
      emailAdmin: user.email,
      idAdmin: user.user_id,
    };
    console.log("request", request);
    if (dialog === "new") {
      const response = await dispatch(createUser(request));
    } else {
      request = {
        ...request,
        user_id: id,
      };
      const response = await dispatch(editUser(request));
    }
    getData();
    handleClose();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div>
          <Button variant="contained" onClick={handleClickOpen}>
            Tạo người dùng
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Người dùng</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Điền thông tin người dùng để tạo mới hoặc cập nhật
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Địa chỉ email"
                type="email"
                fullWidth
                variant="standard"
                defaultValue={email || ""}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Mật khẩu"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <FormControl fullWidth style={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">Vai trò</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  onChange={(e) => {
                    setRole(e.target.value as any);
                  }}
                  defaultValue={role || ""}
                >
                  <MenuItem value="normal_user">User</MenuItem>
                  <MenuItem value="seller">User and Seller</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy bỏ</Button>
              <Button onClick={() => handleCreate()}>Hoàn thành</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "10%" }}>STT</StyledTableCell>
              <StyledTableCell>Họ tên</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Thao tác</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell sx={{ width: "10%" }}>{index}</StyledTableCell>
                <StyledTableCell>
                  {user.fullname ? user.fullname : "Chưa cập nhật"}
                </StyledTableCell>
                <StyledTableCell>{user.email}</StyledTableCell>
                <StyledTableCell>
                  {user.role == "normal_user"
                    ? "Người dùng thường"
                    : user.role == "seller"
                    ? "Người bán"
                    : "Admin"}
                </StyledTableCell>
                <StyledTableCell>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleRemove(user.user_id)}
                    >
                      Xóa
                    </Button>
                    <div>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleOpenUpdateForm(user);
                        }}
                      >
                        Cập nhật
                      </Button>
                    </div>
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
