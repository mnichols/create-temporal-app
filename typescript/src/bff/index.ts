import express from 'express'
import {createHandler} from 'graphql-http/lib/use/express'
import {printSchema} from 'graphql'
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader'
import {loadSchemaSync} from '@graphql-tools/load'
import {makeExecutableSchema} from '@graphql-tools/schema/makeExecutableSchema'
import {createResolvers} from './resolvers.js'
import {ruruHTML} from "ruru/server";
import {createClient} from '../clients/temporal/index.js'
import {cfg} from '../config/index.js'
import fs from 'fs'
import https from 'https'
import cors from 'cors'

const resolvers = createResolvers(await createClient(cfg.Temporal))
/*
https://graphql.org/graphql-js/running-an-express-graphql-server/
 */
const typeDefs = loadSchemaSync("../graphql/app.graphql", {
    loaders: [new GraphQLFileLoader()],
});

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})


console.log(printSchema(typeDefs));

var app = express()
app.use(cors())

// Create and use the GraphQL handler.
app.use(
    "/graphql",
    createHandler({
        schema,
        //rootValue: {...resolvers.Query, ...resolvers.Mutation},
    })
)

// Serve the GraphiQL IDE.
app.get("/", (_req: any, res: any) => {
    res.type("html")
    res.end(ruruHTML({endpoint: "/graphql"}))
})

// Start the server at port
const options = {
    key: fs.readFileSync('../localhost-client-key.pem'),
    cert: fs.readFileSync('../localhost-client.pem'),
};
const httpsServer = https.createServer(options, app)
httpsServer.listen(4000, () => {
    console.log("Running a GraphQL API server at https://localhost:4000/graphql")
})
