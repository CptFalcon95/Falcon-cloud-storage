# Falcon Cloud Storage

### Notice
This project is primarily just me playing around with nodeJS and to build my portfolio.

## About

* Falcon Cloud Storage is a simple cloud storage service build on Node.js using Express.js and MongoDB
* Project status: Development

## Installation

* After cloning the repo run `npm install` in the root directory create a `.env` file in the root directory

* Create two folders in the root called: `tmp` and `user_data`

* Set in the `.env` file the MongoDB connection URL
    
    `DATABASE_URL={YOUR_MONGODB_URL}`

    Currently only tested with MongoDB Atlas clusters. Create the database [here](https://cloud.mongodb.com)

* Set a random string which will be the session secret, on a new line within the `.env` file

    `SESSION_SECRET={RANDOM_STRING}`

* To change the default port add a new line in the `.env` file

    `PORT={XXXX}`

* If SSL is enabled in your environment, add the following to the `.env` file

    `SSL_ENABLED={true}`
    
## Users
A user is a `Guest` when not logged in. A logged in user is either a `User` or a `Admin`
There are no other levels of authority yet

## Features
- User features: 
    * Photo gallery
    * Favorited files 
    * Sharing via public url

- Admin features: 
    * Create/update/delete users
    * Change storage capacity for each user
    * Change user privileges

### Future features 
* Create and share folders
* Real-time chat 
* 2FA
* Commentary box for files

## Requirements
* NodeJS [download here](https://nodejs.org/en/download/)
* For development purposes the npm packages `gulp-cli` and `nodemon` are required, and should install with the rest

## Limitations
Supported file extensions for upload will be: png, jpg, jpeg, docx, doc, avi, mp4, mp3, odt, ods, odp, ppt, pptx, zip, tar, xls, xlsx, 7z, wav

## Start

    npm run start

## Start development server

    npm run startDev
