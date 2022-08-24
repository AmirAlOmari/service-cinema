type Publisher = (qualifier: string, options: object, payload: object) => Promise<unknown>;

/**
 * Wrap the function to inject context propagation.
 *
 * Similar behavior to carotte.subPublication helper function:
 * https://github.com/cubyn/node-carotte-amqp/blob/9feb0bc2277aabe6635b81bda2b2cddd39de50bf/src/index.js#L783
 */
export const correlatePublisher = <T extends Publisher>(
  correlationId: string,
  publisher: T,
  originQualifier?: string,
): T => {
  const wrappedPublisher = (qualifier: string, optionsOrPayload: object, payload?: any) => {
    let options: any;

    if (!payload) {
      payload = optionsOrPayload;
      options = {};
    } else {
      options = optionsOrPayload;
    }

    if (originQualifier) {
      options.headers = { ...options.headers, 'x-origin-consumer': originQualifier };
    }

    options.context = { transactionId: correlationId, ...options.context };

    return publisher(qualifier, options, payload);
  };

  return <any>wrappedPublisher;
};
