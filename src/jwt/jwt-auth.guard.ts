import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException();

        return token === process.env.JWT_SECRET;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] =
            request.headers?.['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
