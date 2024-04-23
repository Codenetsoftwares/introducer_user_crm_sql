FROM node:20.12.0-alpine
WORKDIR app
COPY . .
RUN npm install
EXPOSE 3002
CMD ["npm","start"]
