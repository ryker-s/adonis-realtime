
# Adonis Real-time

Boilerplate created for codecamp. 

Combination of **[Adonis.js](https://adonisjs.com)**, **[TailwindCSS](http://tailwindcss.com/)**, **[Socket.io](https://socket.io/)**, **[MongoDB](https://mongodb.com)**, **Adonis Ally (multi social auth)**


<hr />
<br />


## How to run
 - Git clone.  
- Run `npm install` to install all dependencies
- Make a copy of `.env.example` rename it to `.env`
-  Add database connection string  `.env`  (free cloud hosting from [mongo atlas](https://www.mongodb.com/cloud/atlas))
- Run `adonis key:generate` to generate the secret key
- Run `adonis migration:run` to setup the database
- Run `npm run build:dev` to build static assets (preferably in another terminal tab/window)
- Run `adonis serve --dev` to run the application

