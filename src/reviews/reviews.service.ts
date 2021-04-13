import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviews } from 'src/reviews/review.entity';
import { ReviewsRepository } from './review.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/users/user.entity';
import { Product } from 'src/products/product.entity';



@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(ReviewsRepository)
        private reviewRepository: ReviewsRepository,
    ) { }

    async getReview(): Promise<Reviews[]> {
        return this.reviewRepository.find({where :{deleted_at : null}, relations: ['user'] })
    }

    async createReview(
        createReviewDto: CreateReviewDto
    ): Promise<Reviews> {
        // chan anh tam
        const {
            content,
            userID,
            productId
        } = await createReviewDto;
        try {
            const review = new Reviews();
            review.content = content;
            // cho ni de review.productId thi khong sai moi la
            review.product = await Product.findOne({ where: { id: productId }});
            // cho ni de review.userId nua cho
            review.user = await User.findOne({ where: { id: userID } });
            // may cai productId voi userId la luc anh insert 1 review thi no tu render ra 2 cot nay.
            // anh phai nhet du lieu vao thang relation chu !!
            review.save();

            return review;
        } catch {
            console.log('loi')
        }
    }

    async deleteReview(id : number) : Promise<void>{
        const review = await this.reviewRepository.findOne({where: {id : id}});
        if (!review){
            throw new NotFoundException(`Review not found`);
        }
    await this.reviewRepository.update(id, {deleted_at : new Date()})
    }
}
