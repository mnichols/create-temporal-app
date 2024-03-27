import {Pong, QueryPongArgs, Resolvers, Subscription, SubscriptionSubPingArgs} from './generated.js'
import {GraphQLResolveInfo} from 'graphql'

function delay(t: any) {
    return new Promise(resolve => setTimeout(resolve, t))
}

async function* interval(t: any) {
    while (true) {
        let now = Date.now()
        yield now + ''
        await delay(now - Date.now() + t)
    }
}

const sub = {
    subscribe: async function* (parent: Subscription, args: Partial<SubscriptionSubPingArgs>, context: any, info: GraphQLResolveInfo) {
        for await (const time of interval(1000)) {
            yield time
        }


        // let time = showTime()
        // let current = time.n
        // while (time.next()) {
        //     yield time.next().value
        // }

        // for await (const word of ['Hello', 'Bonjour', 'Ciao']) {
        //     console.log('yielding', word)
        //     yield {value: `${args.input?.value} -- ${word}`};
        // }
    },
    resolve: (payload: any): Pong => {
        console.log('returning payload', payload)
        return {value: payload}
    }
}
export const resolvers: Resolvers = {
    Query: {
        pong: (args: QueryPongArgs) => {
            return {value: args.input?.value}
        }
    },
    Subscription: {
        subPing: sub,
    }
}