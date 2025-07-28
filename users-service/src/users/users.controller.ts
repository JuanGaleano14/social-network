import {
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiOperation({ summary: 'Obtener el perfil del usuario autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Perfil del usuario retornado correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async getProfile(@Request() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario retornado correctamente.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  async getUserById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const { password, ...safeUser } = user;
    return safeUser;
  }
}
