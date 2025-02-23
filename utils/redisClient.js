import redis from "redis";

const client = redis.createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
  },
});

client
  .connect()
  .then(() => console.log("Redis connected successfully"))
  .catch((err) => console.error("Redis Connection Failed:", err));

client.on("error", (err) => console.error("Redis Error:", err));

export default client;
