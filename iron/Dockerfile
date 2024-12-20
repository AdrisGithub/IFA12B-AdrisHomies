# Stage 1: Build the Angular application
FROM maven:3-amazoncorretto-21-alpine AS builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN apk update && \
    apk upgrade && \
    apk add npm
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=builder /usr/src/app/dist/bubatz-ui/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
