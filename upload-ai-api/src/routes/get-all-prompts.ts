import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

//todas as rotas tem que ser async
export async function getAllPromptsRoute(app: FastifyInstance) {
    app.get('/prompts', async () => {
        const prompts = await prisma.prompt.findMany()
    
        return prompts
    })
}