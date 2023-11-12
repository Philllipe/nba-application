# LTS version of node
FROM node:lts

# Create app directory
COPY . /server

# Working directory
WORKDIR /server

# Install app dependencies
RUN npm install

# Expose port 5000
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
