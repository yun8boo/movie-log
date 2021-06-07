export const movieLogs = (parent, args, context, info) => {
  return context.prisma.movieLog.findMany()
}