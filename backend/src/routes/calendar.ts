import {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import {prisma} from '../prisma/prisma';
import getValidatedPlaylistId from '../helper/validatePlaylistId';
import {getUserIdFromToken} from "../helper/getUserIdFromToken";

export default async function calendarRoutes(fastify: FastifyInstance) {

    fastify.get('/calendar', async (request, reply) => {

        let userId: number;
        try {
            userId = await getUserIdFromToken(request)
        } catch {
            return reply.status(401).send({error: 'Not authenticated'})
        }


        try {

            const user = await prisma.users.findUnique({
                where: {id: userId},
            })

            return reply.status(200).send({user})

        } catch (err) {
            console.error(err);
            return reply.status(500).send({error: 'Failed to get calendar'});
        }
    });


}