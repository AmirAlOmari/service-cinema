CAROTTE_AMQP_HOST=rabbitmq:5672
CAROTTE_AMQP_PREFETCH=10
CAROTTE_GRACEFUL_SHUTDOWN_TIMEOUT=25000
CAROTTE_TEARDOWN_AMQP_CLOSE_TIMEOUT=10000
CAROTTE_TEARDOWN_POSTGRESQL_TIMEOUT_MS=3000
CAROTTE_TEARDOWN_ZEEBE_TIMEOUT_MS=3000
CAROTTE_TEARDOWN_SCHEDULER_TIMEOUT_MS=3000

POSTGRESQL_HOST=postgres
POSTGRESQL_PORT=5432
POSTGRESQL_USER=root
POSTGRESQL_PASSWORD=root
POSTGRESQL_DATABASE=service_wms

HTTP_SERVER_PORT=9090
HTTP_SERVER_TOKEN=azerty
HTTP_SERVER_CONNECTION_TIMEOUT_MS=5000

ZEEBE_MOCK_ENABLED=false
ZEEBE_GATEWAY_TLS_ENABLED=false
ZEEBE_GATEWAY_URL=zeebe:26500
ZEEBE_HEALTHCHECK_URL=zeebe:8080/actuator/health/liveness

# in production
# ZEEBE_GATEWAY_TLS_ENABLED=true
# ZEEBE_GATEWAY_TLS_USER=user
# ZEEBE_GATEWAY_TLS_PASSWORD=pass

ZEEBE_OUTBOUND_ORDER_PROCESS_ID=outbound
ZEEBE_INVENTORY_ORDER_PROCESS_ID=inventory
ZEEBE_SCREENING_ORDER_PROCESS_ID=screening
ZEEBE_PALLETIZATION_ORDER_PROCESS_ID=palletization

HOSTNAME=service_wms_pod-A
SCHEDULER_EXECUTION_INTERVAL_MS=60000

SCREENING_REQUEST_CREATION_CRON='0 0 * ? * *'
