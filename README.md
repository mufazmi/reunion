
  

# Back End Assignment - REUNION

  

  

An assignment from the **REUNION** for the backend developer role.

  

  

## Stacks

  

-  **Backend** : Nodejs (Express) - Typescript

  

-  **Database** : MongoDb

  

  

## API's End Points

  

  

-  **POST :**  ```/api/authenticate``` Authenticate a user

  

  

-  **POST :**  ```/api/follow/{id}``` Follow a user

  

  

-  **POST :**  ```/api/unfollow/{id}``` Unfollow a user

  

  

-  **GET :**  ```/api/user``` Authenticated user's profile

  

  

-  **POST :**  ```/api/posts``` Publish a post

  

  

-  **GET :**  ```/api/posts``` Get a single post

  

  

-  **GET :**  ```/api/all_posts``` All Posts

  

  

-  **DELETE :**  ```/api/posts/{id}``` Delete a post

  

  

-  **POST :**  ```/api/like/{id}``` Like a post

  

  

-  **POST :**  ```/api/Unlike/{id}``` Unlike a post

  

  

-  **POST :**  ```/api/comment/{id}``` Add a comment in post

## DOCKER

> To build the Docker image, navigate to the directory containing the Dockerfile and run the following command:
```sh
docker build -t reunion .
```
<br>

> This command will run the App at 3000 PORT , 
```ps
`docker run -p 3000:3000 reunion
```
The app should now be accessible at `http://localhost:3000`