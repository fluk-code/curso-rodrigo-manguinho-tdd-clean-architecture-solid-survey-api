export default {
  mongoURL: process.env.MONGO_URL ?? 'mongodb://root:survey@localhost:27017/clean-node-api?authSource=admin',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? 'ekf-2919'
}
