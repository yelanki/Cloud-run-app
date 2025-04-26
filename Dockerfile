FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Install serve to host the static files
RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]

# docker build -f Dockerfile -t my-example:latest .
# docker images      
# docker run my-example:latest    

# To stop and remove the container:
# docker stop frontend-container
# docker rm frontend-container
# docker build -t my-frontend . 
# us-central1-docker.pkg.dev/cloudrun-workshop-2025/docker-images/prasanth-frontend:latest 
# docker run -d -p 5173:5173 --name frontend-container my-frontend


# Here the tag name(prasanth-latest should be different for each image like prasanth-backend:latest1 and prasanth-frontend:latest)
# docker build -t us-central1-docker.pkg.dev/cloudrun-workshop-2025/docker-images/prasanth-frontend:prasanth-latest1 . --platform linux/amd64
# docker push us-central1-docker.pkg.dev/cloudrun-workshop-2025/docker-images/prasanth-frontend:prasanth-latest1 

# Why did we mention the full path here while building the image?
# The answer is that using the full path is the best practice to build an docker image. If we don't use the full path and build image, later we have to tag the image with the full path.

# cd ../terraform-frontend
# terraform init
# terraform apply