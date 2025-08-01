import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Obtener saludo de bienvenida' })
  @ApiResponse({ status: 200, description: 'Saludo de bienvenida.' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
