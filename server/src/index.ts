import { ApolloServer, IResolvers } from 'apollo-server'

let links = [{
  id: 'link-0',
  description: 'Fullstack tutorial for GraphQL',
  url: 'www.howtographql.com',
}]

const typeDefs = `
  type Query {
    info: String!
    feed: [Link]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

const resolvers: IResolvers<any, any> | IResolvers<any, any>[]
= {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );