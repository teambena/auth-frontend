FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @quasar/cli
COPY . .

EXPOSE 8050

# Set the command to run the application
CMD ["quasar", "dev", "-p", "8050"]
