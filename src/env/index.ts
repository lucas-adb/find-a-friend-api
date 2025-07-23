import  "dotenv/config";
import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333)
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  const pretty = z.prettifyError(_env.error);
  const errorMessage = 'Invalid environment variables';
  console.error(errorMessage, pretty);
  throw new Error(errorMessage);
}

export const env = _env.data;