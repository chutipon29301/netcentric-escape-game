FROM node:9
WORKDIR /backend
COPY . .
RUN yarn && yarn build
EXPOSE 3000
CMD ["yarn", "serve"]