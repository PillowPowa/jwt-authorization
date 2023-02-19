declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      THIS_API_URL: string;
      CLIENT_REDIRECT_URI: string;

      MONGO_URL: string;
      BCRYPT_SALT: string;

      JWT_SECRET_ACCESS_KEY: string;
      JWT_ACCESS_EXPIRES_IN: string;

      JWT_SECRET_REFRESH_KEY: string;
      JWT_REFRESH_EXPIRES_IN: string;

      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_USER: string;
      SMTP_PASSWORD: string;
    }
  }
}

export {};
