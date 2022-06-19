# CRUD API

### Pure Node.js simple CRUD API using in-memory database underneath

### To use the application 

1. ``` git clone https://github.com/aldrachova/crud-api.git ```
2. ``` cd ./crud-api ```
3. ``` git checkout develop ```
4. ``` npm install ```
5. ``` In root directory create new file .env ```
6. ``` Write PORT value to file .env For example, PORT = 3000 ```
7. To run in dev mode use ``` npm run start:dev ```
8. To run in prod mode use ``` npm run start:prod ```

### Implemented endpoint api/users:
``` GET api/users ``` is used to get all persons

``` GET api/users/${userId} ``` returns user with corresponding userId

``` POST api/users ``` is used to create record about new user and store it in database

``` PUT api/users/{userId} ``` is used to update existing user

``` DELETE api/users/${userId} ``` is used to delete existing user from database
