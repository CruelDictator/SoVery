const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { json } = require('body-parser');
const loggerConfig = require('./config/loggerConfig');

const { NODE_ENV, SESSION_NAME, SESSION_SECRET, SESSION_MAX_AGE, MONGO_DB_URI, PORT } = process.env;

const app = express();

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

// Serve React Application
if (NODE_ENV !== 'development') {
    app.use(express.static('dist'));
}

// Set User Session
const MongoStore = require('connect-mongo');
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: MONGO_DB_URI,
            collectionName: 'sessions'
        }),
        name: SESSION_NAME,
        secret: SESSION_SECRET,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: parseInt(SESSION_MAX_AGE, 10),
            sameSite: true,
            httpOnly: true,
            secure: NODE_ENV !== 'development'
        }
    })
);

// Import GraphQL schema and resolvers
const typeDefs = require('./graphql/schemas/schemas');
const resolvers = require('./graphql/resolvers/resolvers');
const schemaDirectives = require('./graphql/directives/directives');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    introspection: NODE_ENV === 'development',
    playground: NODE_ENV === 'development'
});

// Start Apollo Server and connect to MongoDB
async function startServer() {
    try {
        await server.start();

        // Apply Apollo middleware
        app.use(
            '/graphql',
            json(),
            expressMiddleware(server, {
                context: async ({ req, res }) => ({ req, res })
            })
        );

        // Logging with Morgan
        if (NODE_ENV === 'development') {
            loggerConfig(app);
        }

        // Connect to MongoDB
        await mongoose.connect(MONGO_DB_URI);
        console.log('Connected to MongoDB');

        const port = PORT || 8080;
        app.listen({ port }, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
}

startServer(); 