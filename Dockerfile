ARG REPO=836347527647.dkr.ecr.us-east-1.amazonaws.com
FROM ${REPO}/node:12.15.0-alpine

ENV NODE_OPTIONS='--max_old_space_size=6144'

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install npm packages
RUN npm install

COPY . .

# This command does a clean npm i (used by CI)
# RUN npm ci

# Build our app for production
RUN npm run build

# generate prisma server
RUN npx prisma generate

# RUN npx prisma migrate dev

EXPOSE 3000

# docker build -t nestjs-app .
# docker run --name nestjs-app -p 3000:3000 nestjs-app

CMD [ "npm","run","start:prod" ]
