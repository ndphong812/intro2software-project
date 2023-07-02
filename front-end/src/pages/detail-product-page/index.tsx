import Header from "components/header";
import Footer from "components/footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "app/hook";
import { addProductToCart, getDetailProduct } from "redux/product/productThunk";
import { Cart, Product } from "redux/product/type";
import "./style.scss";
import StarRatings from "react-star-ratings";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { authState } from "redux/auth/authSlice";
import { toast } from "react-toastify";
import { SwalAlert } from "utils/sweet-alter";
const DetailProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const selector = useAppSelector(authState);
  const productId = params.productId;
  const [product, setProduct] = useState<Product>({} as Product);
  const [amount, setAmount] = useState<number>(1);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const getDetail = async () => {
    const response = await dispatch(getDetailProduct(productId as string));
    setProduct(response.payload.product);
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleChangeAmount = (value: number) => {
    if (amount + value >= 1) setAmount(amount + value);
  };

  const handleAddCart = async () => {
    if (!selector.isLoggin) {
      SwalAlert("Oops", "Bạn phải đăng nhập trước", "error").then((result) => {
        navigate("/auth/login");
      });
    } else {
      const user = selector.user;
      const newCart: Cart = {
        user_id: user.user_id,
        product_id: productId as string,
        amount: amount,
      };
      const response = await dispatch(addProductToCart(newCart));
      toast(response.payload.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleOrder = () => {
    handleAddCart();
    navigate("/checkout");
  };

  return (
    <>
      <Header />
      {Object.keys(product).length > 0 && (
        <div className="product-detail">
          <div className="container">
            <div className="product-detail-main">
              <div className="product-detail-main-image">
                <img src={product.image_link} />
              </div>
              <div className="product-detail-main-infor">
                <div className="product-detail-main-infor-title">
                  <div className="product-detail-main-infor-title-name">
                    {product.name}
                  </div>
                  <div className="product-detail-main-infor-title-detail">
                    {product.detail}
                  </div>
                </div>
                <div className="product-detail-main-infor-statistic">
                  <div className="product-detail-main-infor-statistic-rating">
                    <span>{product.average_rate}</span>
                    <StarRatings
                      starRatedColor="#4096FF"
                      rating={product.average_rate}
                      starDimension="20px"
                      starSpacing="0"
                    />
                  </div>
                  <div className="product-detail-main-infor-statistic-judge">
                    <span>229</span>
                    <span> đánh giá</span>
                  </div>
                  <div className="product-detail-main-infor-statistic-soldout">
                    <span>838</span>
                    <span> đã bán</span>
                  </div>
                </div>
                <div className="product-detail-main-infor-price">
                  <div className="product-detail-main-infor-price-original">
                    {`${numeral(product.original_price).format("0,0")}đ`}
                  </div>
                  <div className="product-detail-main-infor-price-sale">
                    {`${numeral(product.sale_price).format("0,0")}đ`}
                  </div>
                </div>
                <div className="product-detail-main-infor-stock">
                  <div className="product-detail-main-infor-stock-title">
                    Số Lượng
                  </div>
                  <div className="product-detail-main-infor-stock-input">
                    <button onClick={() => handleChangeAmount(-1)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <input type="number" min="1" value={amount} />
                    <button onClick={() => handleChangeAmount(1)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  <div className="product-detail-main-infor-stock-title">
                    100 sản phẩm có sẵn
                  </div>
                </div>
                <div className="product-detail-main-infor-action">
                  <button
                    onClick={() => handleAddCart()}
                    className="product-detail-main-infor-action-cart"
                  >
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span>Thêm vào giỏ hàng</span>
                  </button>
                  <button
                    onClick={() => handleOrder()}
                    className="product-detail-main-infor-action-order"
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};
export default DetailProductPage;
