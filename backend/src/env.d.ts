declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    SECRET: string;
    NODE_ENV?: 'development' | 'production';
    PORT: number,
    LOC_CLIENT_URL: string;
    PROD_CLIENT_URL: string
  }
}
