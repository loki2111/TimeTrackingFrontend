# Stage 1: Serve the Angular application with Nginx
FROM nginx:alpine
COPY dist/TimeTrackingApp /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
