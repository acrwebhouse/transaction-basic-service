FROM node:10
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
COPY . /usr/src/app
RUN npm install 
RUN chmod +x ./dockerCmd.sh
EXPOSE 13000
CMD [ "./dockerCmd.sh"]