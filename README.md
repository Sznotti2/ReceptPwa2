## **Frontend setup**

### **Navigate to `frontend/` directory.**

```
$ npm i
$ ng s
(to open in browser automatically use ng s -o)
```
You can now view the app on http://localhost:4200/.

<br>

## **Backend setup**

### **MySQL database**

You can change the properties (database_url, user, password) in `backend/src/main/resources/application.properties`.

The schema is created automatically by JPA.

### **Spring Boot api**

Navigate to `backend/` directory and execute the following command:

```
./mvnw spring-boot:run
```
You can now use backend on http://localhost:8080/.
