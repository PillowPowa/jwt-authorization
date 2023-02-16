declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGO_URL: string;
      BCRYPT_SALT: string;
    }
  }
}

export {};
