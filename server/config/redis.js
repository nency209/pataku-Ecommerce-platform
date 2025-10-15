// config/redis.js
import { createClient } from "redis";

// Hardcoded URL (or use process.env.REDIS_URL if you want)
const REDIS_URL = "redis://default:xiTWSOJGGf3xwQxxLplefvClZAoJixHB@redis-14163.c62.us-east-1-4.ec2.redns.redis-cloud.com:14163";

const redisClient = createClient({ url: REDIS_URL });

redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));

export default redisClient;
