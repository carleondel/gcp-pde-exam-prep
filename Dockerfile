FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY index.html ./
COPY main.jsx ./
COPY vite.config.js ./
COPY gcp-pde-exam-prep.jsx ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
