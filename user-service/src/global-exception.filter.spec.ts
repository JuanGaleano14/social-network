import { ArgumentsHost } from '@nestjs/common';
import { GlobalExceptionFilter } from '../src/global-exception.filter';

describe('GlobalExceptionFilter', () => {
  let filter: GlobalExceptionFilter;
  let mockResponse: any;
  let mockRequest: any;
  let mockHost: any;

  beforeEach(() => {
    filter = new GlobalExceptionFilter();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockRequest = { url: '/test' };
    mockHost = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
        getRequest: () => mockRequest,
      }),
    } as unknown as ArgumentsHost;
  });

  it('debe manejar HttpException correctamente', () => {
    const exception: any = {
      getStatus: () => 400,
      getResponse: () => 'Bad Request',
      instanceof: (cls: any) => cls.name === 'HttpException',
    };
    Object.setPrototypeOf(
      exception,
      Object.getPrototypeOf(
        new (require('@nestjs/common').HttpException)('Bad Request', 400),
      ),
    );
    filter.catch(exception, mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        path: '/test',
        message: 'Bad Request',
      }),
    );
  });

  it('debe manejar errores genéricos correctamente', () => {
    const exception = new Error('Error inesperado');
    filter.catch(exception, mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        path: '/test',
        message: 'Error inesperado',
      }),
    );
  });

  it('debe manejar errores desconocidos correctamente', () => {
    filter.catch('algo raro', mockHost);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        path: '/test',
        message: 'Error interno del servidor',
      }),
    );
  });
});
