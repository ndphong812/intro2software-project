export type Product = {
    accept: boolean;
    available: boolean;
    average_rate: number;
    brand: string;
    detail: string;
    image_link: string;
    name: string;
    original_price: number;
    owner_id: string;
    product_id: string;
    sale_price: number;
    sold_amount: number;
    stock: number;
    type: string;
}

export type Cart = {
    user_id: string;
    product_id: string;
    amount: number;
}

export type CartRequest = {
    product_id: string;
    user_id: string;
}

export type UpdateCartRequest = {
    product_id: string;
    user_id: string;
    amount: number;
}

export type Ordered = {
    order_id: string;
    product_id: string;
    customer_id: string;
    amount: number;
    date_time: Date;
    note: string;
    status: string;
    total_monney: number;
}