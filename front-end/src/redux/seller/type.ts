export type GetProductSeller = {
    owner_id: string,
    user_id: string,
}

export type RemoveProductSeller = {
    owner_id: string,
    user_id: string,
    product_id: string
}

export type AddProductSeller = {
    user_id: string,
    owner_id: string,
    name: string;
    detail: string;
    stock: number;
    original_price: number;
    sale_price: number;
    image_link: string;
    type: string;
    brand: string;
}

export type GelAllOrderSeller = {
    user_id: string,
    owner_id: string,
}

export type UpdateStatusSeller = {
    owner_id: string,
    user_id: string,
    order_id: string,
    product_id: string,
    customer_id: string,
    status: string
}