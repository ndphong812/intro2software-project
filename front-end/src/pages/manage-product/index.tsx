import { useAppDispatch, useAppSelector } from "app/hook";
import axios from "axios";
import ProductListSeller from "components/product-list-seller"
import { useEffect, useState } from "react";
import { authState } from "redux/auth/authSlice";
import "./style.scss";
import { getProductSeller } from "redux/seller/sellerThunk";
import { AddProductSeller } from "redux/seller/type";
import NewEditProduct from "components/new-product";
import { Product } from "redux/product/type";

const ManageProduct = () => {

    const [open, setOpen] = useState(false);
    const selector = useAppSelector(authState);
    const user = selector.user;
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({} as Product);
    const dispatch = useAppDispatch();
    const getData = async () => {
        const response: any = await dispatch(getProductSeller({
            owner_id: user.user_id,
            user_id: user.user_id,
        }))

        if (response.payload && response.payload.data && response.payload.data.products) {
            setProducts(response.payload.data.products);
        }
    }

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const setProductEdit = (product: Product) => {
        setProduct(product);
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="manage-product">
            <button className='new-product-btn' onClick={handleOpen}>
                Thêm sản phẩm mới
            </button>
            <NewEditProduct product={product} isOpen={open} handleOpen={handleOpen} handleClose={handleClose} getData={getData} />
            <div className="manage-product-list">
                <ProductListSeller getData={getData} products={products} handleOpen={handleOpen} setProductEdit={setProductEdit} />
            </div>
        </div>
    )
}

export default ManageProduct;