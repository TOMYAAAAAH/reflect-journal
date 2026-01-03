import JwtPayload from "../types/JwtPayload";
import {FastifyRequest} from "fastify";

export const getUserIdFromToken = async (request: FastifyRequest) => {
    const payload = await request.jwtVerify<JwtPayload>()
    return Number(payload.userId)
}