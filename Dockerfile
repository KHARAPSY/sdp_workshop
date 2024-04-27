FROM node:slim
WORKDIR /sdp_workshop
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6969
CMD ["npm", "start"]