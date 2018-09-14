FROM node:9
WORKDIR /backend-admin
COPY . .
RUN npm install -g @angular/cli && npm install -g yarn && yarn
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0"]