FROM lambci/lambda:build-nodejs12.x

WORKDIR /src/

COPY package.json package-lock.json /src/

# RUN npm ci --silent
RUN npm install

COPY . .

CMD npm start