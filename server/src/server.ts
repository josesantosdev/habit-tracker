import Fastfy from "fastify";
import cors from "@fastify/cors";

const app = Fastfy()

app.register(cors)


app.listen({
    port: 3333,
}).then(() => {
    console.log("HTTP listening on port 3333")

})
