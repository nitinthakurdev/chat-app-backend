# Use an official Bun runtime as the base image
FROM oven/bun:latest

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY public ./public

# Set environment variables
ENV NODE_ENV=development
ENV MONGODB_URI=mongodb+srv://root:project1@cluster0.fmt9tkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV CLIENT_URL=http://localhost:5173
ENV CLOUDINARY_SECRET=wtsMR2jSl9gD5TZUqq9DUHitSvg
ENV CLOUDINARY_API_KEY=835144172145245
ENV CLOUDINARY_NAME=dqjgeh4we
ENV JWT_TOKEN=7c44935a248f75010a8838a5bf83f1da16d138437d7350420507fa59d1eb7de5155896fd0bd4281a7a5a2f3c94db579b53d7f4f9ca1b73003d93e727b668abecaf2b2040d34fc7f766944a7d49b9974124faec5e2e731d55d617f7b628270a267fd799f460c2c1dee5629b3421157912057bd71be808e5d65daa2fe96032d2df

RUN bun install --production

EXPOSE 4000

CMD [ "bun", "run" , "src/index.ts" ]

