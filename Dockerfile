FROM node:25
WORKDIR /api
COPY package* .
RUN npm install
COPY . .
ENTRYPOINT npm run dev