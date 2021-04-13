import { Repository, EntityRepository } from "typeorm";
import {Orders} from "./orders.entity";

@EntityRepository(Orders)
export class OrdersRespository extends Repository<Orders>{}
