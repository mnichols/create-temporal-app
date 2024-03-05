import {printSchema} from 'graphql'
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader'
import {loadSchemaSync} from '@graphql-tools/load'
import {createHandler} from 'graphql-sse/lib/use/http2'
import * as http2 from 'http2'

const typeDefs = loadSchemaSync("../../graphql/schema.graphql", {
    loaders: [new GraphQLFileLoader()],
});
console.log(printSchema(typeDefs));

//Create the GraphQL over SSE handler
const sseHandler = createHandler({schema: typeDefs});
// Create an HTTP/2 server using the handler on `/graphql/stream`
const server = http2.createServer((req, res) => {
    console.log('received request', req)

    if (req.url.startsWith('/sub')) {
        return sseHandler(req, res);
    }
    res.writeHead(404).end();
});

server.listen(4000);
console.log('Listening to port 4000');