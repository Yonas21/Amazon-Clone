import { OrderEntity } from "../entities";
import { DB } from "../utils";

export const OrderRepository = DB.getRepository(OrderEntity).extend({});
