const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');


const { typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');


const app = express();
const PORT = process.env.PORT || 3001;
//Appollo server as middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../client/build/index.html'));
});

//instance of apollo server
const startApolloServer = async (typeDefs, resolvers) =>{
  await server.start();
  server.applyMiddleware({ app });


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(` 🌍 API server running on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};

//async function to start server
startApolloServer(typeDefs, resolvers);

