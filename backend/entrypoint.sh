#!/bin/sh

echo "LOG: Gerando o Prisma Client"
npx prisma generate

echo "LOG: Aplicando migrações com deploy"
npx prisma migrate deploy

echo "LOG: Iniciando o servidor com hot reload"
yarn dev
