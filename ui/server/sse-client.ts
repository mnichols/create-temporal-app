import {createClient} from 'graphql-sse';

const client = createClient({
    // singleConnection: true, preferred for HTTP/1 enabled servers and subscription heavy apps
    url: 'http://localhost:4000/graphql/stream',
});

// query
(async () => {
    const query = client.iterate({
        query: '{ hello }',
    });

    const {value} = await query.next();
    console.log('MY VALUE', value)
    // expect(value).toEqual({ hello: 'world' });
})();

// subscription
(async () => {
    const subscription = client.iterate({
        query: 'subscription { greetings }',
    });

    for await (const event of subscription) {
        console.log('MY EVENT', event)
        // expect(event).toEqual({greetings: 'Hi'});

        // complete a running subscription by breaking the iterator loop
        break;
    }
})();