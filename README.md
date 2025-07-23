## **Frontend setup**

### **Navigate to `frontend/` directory.**

```
$ npm i
$ ng s
(to open in browser automatically use ng s -o)
```
You can now view the app on http://localhost:4200/.

## **Backend setup**

### **Navigate to `backend/receptpwa2/` directory.**

### **MySQL database**

You can change the properties (url, user, password) in `./src/main/resources/application.properties`.

The schema is in `./src/main/resources/schema.sql`.

### **Spring Boot api**

```
$ ./mvnw spring-boot:run
```
You can now use the app on http://localhost:8080/.
