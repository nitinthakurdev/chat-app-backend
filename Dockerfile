# Use an official Bun runtime as the base image
FROM oven/bun:latest

WORKDIR /app

# Copy dependencies first for better caching
COPY package.json bun.lockb ./
RUN bun install --production

# Copy source files
COPY . .

EXPOSE 4000

CMD ["bun", "run", "start"]
