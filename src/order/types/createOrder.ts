import { IProduct } from "../dtos/createOrder.dto";

export type ICreateOrder = {
    totalPrice: number;
    productOrder: IProduct[]
}