import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Product } from 'redux/product/type';
import "./style.scss";
import numeral from "numeral";
import StarRatings from 'react-star-ratings';
import { useNavigate } from 'react-router-dom';
type Props = {
    product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {

    const navigate = useNavigate();
    const handleGoToDetail = () => {
        console.log("pro", product);
        navigate(`detail/${product.product_id}`);
    }
    return (
        <>
            {
                Object.keys(product).length > 0 &&
                <div className="card" onClick={() => handleGoToDetail()}>
                    <div className="card-image">
                        <img src={product.image_link} />
                    </div>
                    <div className="card-detail">
                        <h3 className="card-detail-name">
                            {product.name}
                        </h3>

                        <p className="card-detail-price card-detail-price-original">
                            {`${numeral(product.original_price).format('0,0')}đ`}
                        </p>
                        <p className="card-detail-price">
                            {`${numeral(product.sale_price).format('0,0')}đ`}
                        </p>
                        <p className="card-detail-statistic">
                            <div className="card-detail-statistic-rate">
                                <StarRatings
                                    starRatedColor="#D10024"
                                    rating={product.average_rate}
                                    starDimension="20px"
                                    starSpacing="0"
                                />
                            </div>
                            <p className="card-detail-statistic-soldout">
                                {`Đã bán: ${numeral(product.sold_amount).format('0,0')}`}
                            </p>
                        </p>

                        <p className="card-detail-address">
                            Thành phố HCM
                        </p>
                    </div>
                </div>
            }

        </>
    )
}

export default ProductCard;