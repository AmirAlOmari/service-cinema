/* eslint-disable @typescript-eslint/no-unused-vars */
import { logger } from 'scripts/bounded-contexts-isolation/fixtures/src/core/infra/logger';
import type { CarrierRepositoryPort } from '../ports/carrier.repository';

export class HttpCarrierRepository implements CarrierRepositoryPort {}
