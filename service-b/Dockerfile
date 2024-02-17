# Stage 1: Build
FROM --platform=linux/amd64 node:18 AS build

WORKDIR /app

COPY . .
RUN npm install && npm run build

# Stage 2: Production
FROM --platform=linux/amd64 node:18-alpine AS production

WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=service-b
EXPOSE 3002

CMD ["node", "dist/main.js"]
