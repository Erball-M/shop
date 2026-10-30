export interface PrismaConfigOptions {
  configFileUrl: string | URL;
  databaseUrlEnvironmentVariable: string;
}

export function createPrismaConfig(options: PrismaConfigOptions): {
  schema: string;
  migrations: {
    path: string;
  };
  datasource: {
    url: string | undefined;
  };
};
