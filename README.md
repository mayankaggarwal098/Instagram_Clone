# Instagram_Clone

## How to run ?

Make sure to follow all these steps exactly as explained below. Do not miss any steps or you won't be able to run this application.

### 1) Clone the repository
```
git clone https://github.com/mayankaggarwal098/Instagram_Clone.git
```

### 2) Change directory
```
cd Instagram_Clone
```
### 3) Install Dependencies
```
npm i
```

### 4) Change directory
```
cd client
```
### 5) Install Dependencies
```
npm i
```

### 6) Setting Config.

Create dev.js file in config folder and write below code in it:

```
module.exports = {
  MONOGOURI: "mongodb://localhost/instagram",
  jwtPrivateKey: <KEY>,
  SENDGRID_API_KEY:
    <your sendgrid api key>,
  EMAIL: "http://localhost:3000",
};
```


### 8) Start the Server.

open cmd prompt in root folder and write:
```
nodemon
```


open cmd prompt in client folder  and write:
```
npm start
```

Open up your browser and head over to:
http://localhost:3000/

