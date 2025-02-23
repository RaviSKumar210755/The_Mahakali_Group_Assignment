import redisClient from "./redisClient.js";

const flushCache = async () => {
  try {
    await redisClient.flushAll();
    console.log("Redis cache flushed successfully");
  } catch (error) {
    console.error("Error flushing Redis cache:", error);
  }
};

export default flushCache;
