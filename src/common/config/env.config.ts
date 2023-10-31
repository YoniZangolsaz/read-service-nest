const envConfig = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MONGO_URL,
    collection: process.env.COLLECTION_NAME,
    queries: {
      personalNumber: process.env.PERSONAL_NUMBER_KEY,
      identityCard: process.env.IDENTITY_CARD_KEY,
      user: process.env.USER_KEY,
    },
  },
  cron: process.env.CRON,
  metaData: {
    serviceName: process.env.SERVICE_NAME,
    systemName: process.env.SYSTEM_NAME,
    description: process.env.DESCRIPTION,
  },
});

export default envConfig;

export type EnvConfig = ReturnType<typeof envConfig>;
