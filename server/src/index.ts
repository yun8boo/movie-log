import { ApolloServer, IResolvers } from 'apollo-server'
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs'

const prisma = new PrismaClient()

const main = async() => {
  await prisma.movieLog.findMany()
}

const resolvers: IResolvers<any, any> | IResolvers<any, any>[]
= {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    movieLogs: async (parent, args, context) => {
      return await context.prisma.movieLog.findMany()
    },
  },
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.movieLog.create({
        data: {
          title: args.title,
          content: args.content
        }
      })
      return newLink
    }
  },
  MovieLog: {
    id: (parent) => parent.id,
    title: (parent) => parent.title,
    content: (parent) => parent.content,
  }
}

// readFileSyncに渡しているパスはnodeが起動したときの位置になる？
const typeDefs = fs.readFileSync("../schema.graphql", { encoding: "utf8" });

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
  context: {
    prisma,
  }
})

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );