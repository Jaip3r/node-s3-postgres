export default {
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_PUBLIC_KEY: process.env.AWS_PUBLIC_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    DATABASE: process.env.DATABASE,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    HOST: process.env.HOST || "localhost", 
    PORT: process.env.PORT || 3000
}