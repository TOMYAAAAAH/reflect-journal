# 5 Ans de Reflexion

how to run
backend / npx ts-node server.ts


## TODO

// 8. Register CORS (allow frontend to access API)
fastify.register(cors, {
origin: true,
});
What this does:

Registers the CORS plugin
origin: true allows all origins (for development)
Later, you can restrict to only your domain: origin: 'https://cinqans.tomalmarcha.fr'
**in server.ts**

