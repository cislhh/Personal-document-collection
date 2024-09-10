// src/main.ts
import fastify from 'fastify';

const server = fastify();

server.get('/', async (request, reply) => {
    return ' is running\n';
});

const listen = async () => {
    try {
        await server.listen({ port: 8080 });

        console.log('Server is running at http://localhost:8080');
    } catch (err) {
        server.log.error(err);

        process.exit(1);
    }
};

listen();
