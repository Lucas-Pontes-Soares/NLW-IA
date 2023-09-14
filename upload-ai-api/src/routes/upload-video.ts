import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart';
import { prisma } from "../lib/prisma";
import path from "node:path";
import fs from "node:fs";
import { pipeline } from "node:stream";
import { randomUUID } from "node:crypto";
import { promisify } from "node:util";

const pump = promisify(pipeline)

//todas as rotas tem que ser async
export async function uploadVideoRoute(app: FastifyInstance) {
    app.register(fastifyMultipart, {
        limits: {
            fileSize: 1_048_576 * 25, //25mb
        }
    })
    app.post('/videos', async (request, reply) => {
        const data = await request.file()

        if(!data){
            return reply.status(400).send({ error: "Missing file input "})
        }

        const extension = path.extname(data.filename)

        if(extension != '.mp3'){
            return reply.status(400).send({ error: "Invalid input type, please upload a .mp3 "})
        }
        // file = exemplo.mp3
        const fileBaseName = path.basename(data.filename, extension)
        // fileBaseName = exemplo
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
        // fileUploadName = exemplo-123312.mp3

        const uploadDestination = path.resolve(__dirname, '../../tmp', fileUploadName)

        await pump(data.file, fs.createWriteStream(uploadDestination))

        const video = await prisma.video.create({
            data: {
                nome: data.filename,
                path: uploadDestination
            }
        })
        return {
            video
        }
    })
}