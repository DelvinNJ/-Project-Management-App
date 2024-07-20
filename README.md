
# XML-DB-Import Project Documentation

This repository contains code for importing and managing XML data in a database using Laravel.


### Installation
- Clone the repository:
```http
git clone https://github.com/DelvinNJ/Project-Management-App.git
```
```http
cd Project-Management-App
```

- Install dependencies using Composer:
```http
composer install
npm install
```

- Copy the environment file and generate application key:
```http
cp .env.example .env
```
```http
php artisan key:generate
```
### Database Setup

- Configure the database in .env file.
- Create the SQLite database file: 
```http
touch database/db.sqlite
```

Run database migrations to set up the database schema:
```http
php artisan migrate --seed
npm run dev
```

#### Log Viewer
To view logs, start the Laravel development server:
```http
php artisan serve
```
Then, navigate to the following URL in your web browser:
```http
http://127.0.0.1:8000
```


Contact
If you have any questions or feedback, feel free to reach out:

Email: delvinnj02@gmail.com

Happy coding!