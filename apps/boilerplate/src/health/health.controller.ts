import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { DatabaseService } from '@nx-monorepo-test/common';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private databaseService: DatabaseService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Health status' })
  @HealthCheck()
  async check() {
    return this.health.check([
      async () => {
        try {
          await this.databaseService.executeQuery(async (db) => {
            await db.execute('SELECT 1');
          }, 'health check');
          return { database: { status: 'up' } };
        } catch (error) {
          return { database: { status: 'down', error: error.message } };
        }
      },
    ]);
  }
}
