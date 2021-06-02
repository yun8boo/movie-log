import { ApolloServer, IResolvers } from 'apollo-server'
import * as fs from 'fs'

let links = [{
  id: 'link-0',
  description: 'Fullstack tutorial for GraphQL',
  url: 'www.howtographql.com',
}]

let idCount = links.length

const resolvers: IResolvers<any, any> | IResolvers<any, any>[]
= {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    }
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  }
}

// readFileSyncに渡しているパスはnodeが起動したときの位置になる？
const typeDefs = fs.readFileSync("../schema.graphql", { encoding: "utf8" });

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );