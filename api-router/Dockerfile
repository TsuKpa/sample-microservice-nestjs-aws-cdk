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

ENV HOST=localhost
ENV PORT=3000
ENV SERVICE_A_HOST=service-a
ENV SERVICE_A_PORT=3001
ENV SERVICE_B_HOST=service-b
ENV SERVICE_B_PORT=3002

EXPOSE 3000

CMD ["node", "dist/main.js"]
