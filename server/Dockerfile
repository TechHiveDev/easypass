# Node.js v16 linux 
FROM node:16


# Create app directory
WORKDIR /usr/src/app


# Copy package.json and yarn.lock  
COPY package.json yarn.lock ./


# Install app dependencies by yarn  
RUN yarn 

# Bundle app source
COPY . .

# Generate prisma client
RUN npx prisma generate

# Migrate Datbase 
RUN yarn migrate-database


# Launch the app 
CMD ["yarn", "start"]

