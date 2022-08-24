import 'module-alias/register';
import 'dotenv/config';
import { runtime } from '@core/infra/carotte';
import { ContextManagerPlugin, AjvJsonLoaderPlugin } from '@devcubyn/carotte-runtime';
import { logger } from '@core/infra/adapters/logger';

(async () => {
  try {
    await runtime.hooks.use(new ContextManagerPlugin());
    await runtime.hooks.use(new AjvJsonLoaderPlugin());

    await runtime.start({ domain: 'cinema' });
  } catch (error) {
    logger.error('Error in runtime', { error });
    process.exit(1);
  }
})();
