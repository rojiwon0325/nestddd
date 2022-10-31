type IEnv = {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: string | number;

  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;

  JWT_SECRET: string;
  JWT_EXPIRESIN: string;
};

declare namespace NodeJS {
  interface ProcessEnv extends IEnv {
    [key: string]: string | undefined;
  }
}
