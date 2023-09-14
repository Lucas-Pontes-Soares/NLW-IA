# NLW-IA

* Iniciar projeto
pnpm init

* Instalar dependencias
pnpm i typescript @types/node tsx -D
pnpm i fastify

* Prisma
instalar:       
    pnpm i prisma -D
inicializar:
    pnpm prisma init --datasource-provider sqlite
fazer migration e criar as tabelas:    
    pnpm prisma migrate dev 
visualizar o banco no browser:
    pnpm prisma studio