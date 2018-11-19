require('dotenv').config()

const { MONGO_LOCAL_URL, MONGO_PROD_URL, NODE_ENV, PORT } = process.env

export default {
  port: PORT,
  mongoUrl: NODE_ENV === 'development' ? MONGO_LOCAL_URL : MONGO_PROD_URL,
}
