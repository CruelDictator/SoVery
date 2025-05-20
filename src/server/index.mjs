import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';

import loggerConfig from './config/loggerConfig.js';
import typeDefs from './graphql/schemas/schemas.js';
import resolvers from './graphql/resolvers/resolvers.js';
import schemaDirectives from './graphql/directives/directives.js';

const { NODE_ENV, SESSION_NAME, SESSION_SECRET, SESSION_MAX_AGE, MONGO_DB_URI, PORT } = process.env;

const app = express();

mongoose.set('useCreateIndex', true);

// Set Secure Headers with Helmet
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());

// Serve React Application
// if (NODE_ENV !== 'development') {
app.use(express.static('dist'));
// }

// Set User Session
const MongoStore = connectMongo(session);
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    name: SESSION_NAME,
    secret: SESSION_SECRET,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: parseInt(SESSION_MAX_AGE, 10),
      sameSite: true,
      httpOnly: true,
      secure: !NODE_ENV.trim() === 'development'
    }
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  introspection: NODE_ENV === 'development',
  playground: NODE_ENV === 'development'
});

// Start Apollo Server
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

// Connect to MongoDB and start server
try {
  await mongoose.connect(MONGO_DB_URI);
  console.log('Connected to MongoDB');

  const port = PORT || 8080;
  app.listen({ port }, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (error) {
  console.error('MongoDB connection error:', error);
  process.exit(1);
}
