import {subscriptionExchange, type SubscriptionExchangeOpts} from '@urql/core';
import {PUBLIC_SUBSCRIPTIONS_URL} from '$env/static/public'
import {createClient as createSSEClient, type StreamEvent, type StreamMessage} from 'graphql-sse';
import type {Exchange} from '@urql/svelte'
import {Logger} from '$lib/log/index.js'
import type {RequestParams} from 'graphql-sse/lib/common.js'

// note we are using the distinct connections mode. you might prefer a singleConnection: true
const sseClient = createSSEClient({
    url: PUBLIC_SUBSCRIPTIONS_URL,

});

export const createSubscriptionExchange = (mustUseSubscriptionsURL?: string, opts?: SubscriptionExchangeOpts): Exchange => {
    subscriptionExchange({
        forwardSubscription(request, operation) {

            return {
                subscribe: (sink) => {
                    let url = mustUseSubscriptionsURL || operation.context.url
                    // we have to do this to adapt the `query` attribute for string
                    const params: RequestParams = {
                        operationName: request.operationName,
                        query: request.query || '',
                        variables: request.variables,
                        extensions: request.extensions,
                    }
                    const dispose = sseClient.subscribe(params, sink, {
                        connected(reconnected: boolean): void {
                            Logger.debug('connected event: reconnected? %b', reconnected)
                        },
                        connecting(reconnecting: boolean): void {
                            Logger.debug('connecting event: reconnecting? %b', reconnecting)
                        },
                        message(message: StreamMessage<false, StreamEvent>): void {
                            try {
                                Logger.debug('#fetch-sse.onmessage: %s', message.event, 'received message')
                                if (message?.event === 'complete') {
                                    Logger.debug('#fetch-sse.onmessage: %s', message.event, 'calling sink.complete')
                                    // sink.complete()
                                } else if (message?.data) {
                                    // let tmp = JSON.parse(message.data)
                                    let tmp = 'here is data' + message.data
                                    Logger.debug('#fetch-sse.onmessage: %s', tmp, 'calling sink.next')
                                    // sink.next(tmp)
                                }
                            } catch (e) {
                                Logger.error(e, '#fetch-sse.onmessage: %s', 'failed to handle `next`')
                            }
                        }
                    });

                    return {
                        unsubscribe: dispose,
                    };
                },
            };
        },
    })
}