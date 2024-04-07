import express from 'express'
import {createHandler} from 'graphql-http/lib/use/express'
import {printSchema} from 'graphql'
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader'
import {loadSchemaSync} from '@graphql-tools/load'
import {makeExecutableSchema} from '@graphql-tools/schema/makeExecutableSchema'
import {resolvers} from './resolvers.js'
import {ruruHTML} from "ruru/server";

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


// Create and use the GraphQL handler.
app.use(
    "/graphql",
    createHandler({
        schema: typeDefs,
        rootValue: {...resolvers.Query, ...resolvers.Mutation},
    })
)

// Serve the GraphiQL IDE.
app.get("/", (_req: any, res: any) => {
    res.type("html")
    res.end(ruruHTML({endpoint: "/graphql"}))
})

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")