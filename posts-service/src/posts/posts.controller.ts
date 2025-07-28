import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  UseGuards,
  Request,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { LikesService } from '../likes/likes.service';
import { CreatePostDto } from './dto/create-post.dto';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  constructor(
    private postsService: PostsService,
    private likesService: LikesService,
  ) {}

  @ApiOperation({ summary: 'Crear un nuevo post' })
  @ApiResponse({ status: 201, description: 'Post creado exitosamente.' })
  @UseGuards(AuthGuard('jwt'))
  @HttpPost()
  create(@Body() dto: CreatePostDto, @Request() req) {
    return this.postsService.create(dto, req.user.userId);
  }

  @ApiOperation({ summary: 'Obtener todos los posts' })
  @ApiResponse({ status: 200, description: 'Lista de posts.' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Dar like a un post' })
  @ApiParam({ name: 'id', description: 'ID del post' })
  @ApiResponse({ status: 201, description: 'Like agregado.' })
  @UseGuards(AuthGuard('jwt'))
  @HttpPost(':id/like')
  like(@Param('id') id: string, @Request() req) {
    return this.likesService.like(id, req.user.userId);
  }

  @ApiOperation({ summary: 'Quitar like de un post' })
  @ApiParam({ name: 'id', description: 'ID del post' })
  @ApiResponse({ status: 200, description: 'Like eliminado.' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/like')
  removeLike(@Param('id') id: string, @Request() req) {
    return this.likesService.removeLike(id, req.user.userId);
  }
}
