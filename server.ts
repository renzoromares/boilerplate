import express from "express";
import http from 'http';
import cors from 'cors';
import route from './app/route/user'
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import winston from "winston";

(async () => {  
    

    /**Initialize ENV */
    require("dotenv").config();


    // The GraphQL schema
    const typeDefs = `#graphql
        type Query {
        hello: String
    }
    `;

    // A map of functions which return data for the schema.
    const resolvers = {
    Query: {
        hello: () => 'world',
        },
    };

   /** init new express instance */
    const app = express();
    const httpServer = http.createServer(app)
  

    /** init new gql server */
    const gql_server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        
    });

    //logger
    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        // defaultMeta: { service: 'user-service' },
        transports: [
            //
            // - Write all logs with importance level of `error` or less to `error.log`
            // - Write all logs with importance level of `info` or less to `combined.log`
            //
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log' }),
        ],
    });

    

    const { url } = await startStandaloneServer(gql_server);
    //env
    const PORT = process.env.SERVER_PORT || 4999

    //express
    app.use(
        route,
        cors(),
        expressMiddleware(gql_server)
    );
        
    logger.info('TEST')
    app.listen(PORT, () => console.log(`Running in PORT ${PORT}`));
})()

