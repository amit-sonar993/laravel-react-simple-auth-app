# Laravel + React.js simple auth app

- laravel version 10

## Project set up requirement 
- web server => Apache/2.4.47
- Composer version 2.4.3
- PHP 8.1.8
- mysql version => 5.7


### Clone the project

`git clone https://github.com/amit-sonar993/laravel-react-simple-auth-app.git`

### Go to project dir and run

` composer install `

### Create .env file and copy content from .env.example and set env variables

### Now generate app key using

`php artisan key:generate`

### Create database table

` php artisan migrate `

### Now run Password install command 

`php artisan passport:install`

### Start the server

`php artisan serve`

### Enter the url of laravel app to browser url bar
