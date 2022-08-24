import TrustEnv from 'trust-env';

type Env = {
  CAROTTE_AMQP_HOST: string;
  CAROTTE_AMQP_PREFETCH: number;
  CAROTTE_GRACEFUL_SHUTDOWN_TIMEOUT: number;
  CAROTTE_TEARDOWN_AMQP_CLOSE_TIMEOUT: number;
};

export default TrustEnv<Env>([
  { key: 'CAROTTE_AMQP_HOST', type: 'string', required: false, preset: 'rabbitmq:5672' },
  { key: 'CAROTTE_AMQP_PREFETCH', type: 'integer' },
  { key: 'CAROTTE_GRACEFUL_SHUTDOWN_TIMEOUT', type: 'integer' },
  { key: 'CAROTTE_TEARDOWN_AMQP_CLOSE_TIMEOUT', type: 'integer' },
]);
