# FRONT - SURVEILLANCE PATROL SYSTEM 

The whole project is an challenge, separeted in back (Express), front (Vue js) and mobile (React Native) application using Java Script skills.

A simple control web system wich allows administrators managment each inspection from security guard. 

## Description

![security guard](https://www.jwm-rfid.com/wp-content/uploads/2020/09/guard-patrol.png)

When you employ the guard tour system, you won’t need to use notebooks or keep track of an ever-growing paper trail for your company. Instead, security officials will scan Qr codes checkpoints and log reports with ease using a smartphone, each point might contain an incident and comments. Before that, the system administrator  will plan a patrol route that includes particular checkpoints where security personnel must stop. The real-time event data is automatically delivered to our web system and stored safely. Using a mobile device, each guard is in charge of their own work. 

## How to use it
    
* Check out the backend system (project setup).
* This web interface is thinking and created to admin accounts, who is responsable to follow every security guard account, reports, etc..
* Sign In as an administrator.
* The main screen you will find all report that you need about the security guard tours.
* Fill all catalogues into the system.
* Go "Catalogos > puntos a revisar" you can find the qr code who will contain all information about the point to check.
* You can print the qr code.

* Don't forget change your own url path /src/helpers/url
* The security guard only will use the mobile aplication.

## Technologies
Vue js, Vuex (state managment), moment, Sortable js, Prime Vue, Axios, Sweetalert2

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
* Enjoy!
