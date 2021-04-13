import { ExpressAdapter } from "@nestjs/platform-express";
import { Repository, EntityRepository} from "typeorm";
import {Reviews} from './review.entity';

@EntityRepository(Reviews)
export class ReviewsRepository extends Repository<Reviews>{}

