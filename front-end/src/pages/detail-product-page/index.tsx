import Header from "components/header";
import Footer from "components/footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "app/hook";
import { getDetailProduct } from "redux/product/productThunk";
import { Product } from "redux/product/type";
import "./style.scss";
import StarRatings from "react-star-ratings";
import numeral from "numeral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
const DetailProductPage = () => {

    const params = useParams();
    const productId = params.productId;
    const [product, setProduct] = useState<Product>({} as Product);
    const [amount, setAmount] = useState<number>(1);
    const dispatch = useAppDispatch();
    const getDetail = async () => {
        const response = await dispatch(getDetailProduct(productId as string));
        setProduct(response.payload.product);
    }

    useEffect(() => {
        getDetail();
    }, []);

    const handleChangeAmount = (value: number) => {
        if (amount + value >= 1) setAmount(amount + value);
    }

    return (
        <>
            <Header />
            {
                Object.keys(product).length > 0 &&
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
                                            starRatedColor="#D10024"
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
                                        {`${numeral(product.original_price).format('0,0')}đ`}

                                    </div>
                                    <div className="product-detail-main-infor-price-sale">
                                        {`${numeral(product.sale_price).format('0,0')}đ`}
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
                                        <input type="number" min="1" defaultValue={1} value={amount} />
                                        <button onClick={() => handleChangeAmount(1)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                    <div className="product-detail-main-infor-stock-title">
                                        100 sản phẩm có sẵn
                                    </div>
                                </div>
                                <div className="product-detail-main-infor-action">
                                    <button className="product-detail-main-infor-action-cart">
                                        <FontAwesomeIcon icon={faCartShopping} />
                                        <span>Thêm vào giỏ hàng</span>
                                    </button>
                                    <button className="product-detail-main-infor-action-order">
                                        Mua ngay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}
export default DetailProductPage;