import http from 'http';
import {createHandler} from 'graphql-sse/lib/use/http';
import {schema} from './previous-step.js';

// Create the GraphQL over SSE handler
const handler = createHandler({schema});

// Create an HTTP server using the handler on `/graphql/stream`
const server = http.createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*'); /* @dev First, read about security */
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    res.setHeader('Access-Control-Allow-Headers', 'content-type, accept'); // Might be helpful
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req?.url?.startsWith('/graphql/stream')) {
        return handler(req, res);
    }
    res.writeHead(404).end();
});

server.listen(4000);
console.log('Listening to port 4000');