import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {

  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { 
      body,
      params,
      query
    } = request
    const message = {
      body,
      params,
      query
    };
    const requestId = request.headers['request-id'];


    this.logger.log(`REQUEST: [${requestId}] [${request.method}] [${request.url}] ${JSON.stringify(message)}`)

    return next
      .handle()
      .pipe(
        tap(content => {
          this.logger.log(`RESPONSE: [${requestId}] ${JSON.stringify(content)}`)
        }),
      );
  }
}