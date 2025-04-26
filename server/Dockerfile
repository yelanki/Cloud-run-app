FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]

# FROM ubuntu
# CMD echo "Hello, World!"

# docker build -f Dockerfile -t my-example:latest .
# docker images      
# docker run my-example:latest    
# docker ps

# docker logs backend-container 

# To stop and remove the container:
# docker stop backend-container
# docker rm backend-container
# docker build -t my-backend . 
# us-central1-docker.pkg.dev/cloudrun-workshop-2025/docker-images/prasanth-backend:latest 
# docker run -d -p 3000:3000 --name backend-container my-backend

# Here the tag name(prasanth-latest should be different for each image like prasanth-backend:latest1 and prasanth-frontend:latest)
# docker build -t us-central1-docker.pkg.dev/cloudrun-workshop-2025/docker-images/prasanth-backend:prasanth-latest . --platform linux/amd64
#  docker push us-central1-docker.pkg.dev/cloudrun-workshop-2025/docker-images/prasanth-backend:prasanth-latest 

# cd terraform-backend
# terraform init
# terraform apply