import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserLogsService } from '@/core/user-logs/user-logs.service';
import { AuthHelper } from '@/common/helper/auth.helper';

@Injectable()
export class UserLogsMiddleware implements NestMiddleware {
  constructor(
    private readonly userLogsService: UserLogsService,
    private authHelper: AuthHelper
  ) {}

  async use(req: Request & { user: {id: number} }, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = await this.authHelper.decode(token) as { id: number };
    const userId = decodedToken.id ;

    const route = req.baseUrl + req.path;
    const method = req.method;

    await this.userLogsService.create({userId, route, method, isAutomated: true});



    next();
  }
}
