import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment, CommentEdgeBuilder } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly _commentRepo: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    const createdComment = this._commentRepo.create(createCommentDto);
    return this._commentRepo.save(createdComment);
  }

  async findAll(first: number, cursor: string) {
    const queryBuilder = this._commentRepo.createQueryBuilder('comment');
    queryBuilder
      .orderBy({ userId: 'ASC', productId: 'ASC', createAt: 'ASC' })
      .limit(first);
    const commentEdgeBuilder = new CommentEdgeBuilder();
    if (cursor) {
      const { userId, productId, createAt } =
        commentEdgeBuilder.readCursor(cursor);
      queryBuilder.where('comment.userId > :userId', { userId });
      queryBuilder.andWhere('comment.productId > :productId', { productId });
      queryBuilder.andWhere('comment.createAt > :createAt', { createAt });
    }
    const comments = await queryBuilder.getMany();
    return commentEdgeBuilder.createEdge(comments);
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
