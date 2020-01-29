# Express Boiler Plate

Sample Boiler Plate with example app of user management.
<br/><br/>
## Sample .env File

    PORT = 9010
    NODE_ENV = Dev
    AUTH_TOKENS = 5e2e7918d968ef181594b29c,5e2e7920c2824d983da25c52
    DB_HOST = localhost
    DB_PORT = 5432
    DB_DATABASE = postgres
    DB_USER = postgres
    DB_PASSWORD = mypass
    DB_MAX_CONNECTIONS = 30
    DB_IDLE_TIMEOUT = 100
<br/>

> Please note that in order to start this app you will require a ***'.env'*** file in the root folder of app.

> In this boiler plate it is assumed that on servers you are using environment variables from server and not from the .env file , if you wish to use .env file on server too then just remove the if condition on require of env file in ./app.js line no  6.

> PostgreSQL DB is used in this boiler plate



