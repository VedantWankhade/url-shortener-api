const {ApolloServer} = require('apollo-server-express')
const fs = require('fs');

const about = require('./about.js')
const short = require('./short.js');

const apiResolvers = {

    Query: {

        about: about.getMessage,
        get: short.get,
        getList: short.getList
    },
    Mutation: {

        short: short.short
    }
}

const server = new ApolloServer({

    typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
    resolvers: apiResolvers
})

function installHandler(app) {

    server.applyMiddleware({ app, path: '/api' })
}

module.exports = {installHandler}