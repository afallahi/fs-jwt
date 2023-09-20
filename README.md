<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="150" alt="Nest" /></a>
  <a><image src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" width="150" alt="React" /></a>
</p>
<p align="center">
  <a><img src="https://user-images.githubusercontent.com/25181517/183890598-19a0ac2d-e88a-4005-a8df-1ee36782fde1.png" width="60" alt="Typescript" /></a>
  <a><img src="https://user-images.githubusercontent.com/25181517/182884177-d48a8579-2cd0-447a-b9a6-ffc7cb02560e.png" width="60" alt="Mongo" /></a>
  <a><img src="https://user-images.githubusercontent.com/25181517/186711335-a3729606-5a78-4496-9a36-06efcc74f800.png" width="60" alt="Swagger" /></a>
  <a><img src="https://user-images.githubusercontent.com/25181517/192109061-e138ca71-337c-4019-8d42-4792fdaa7128.png" width="60" alt="Postman" /></a>
  <a><img src="https://user-images.githubusercontent.com/25181517/121401671-49102800-c959-11eb-9f6f-74d49a5e1774.png" width="60" alt="npm" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Token-based Authentication

![Screenshot](./backend/Nest_JWT.png)

Users enter their username and password to obtain access token which allows them to fetch protected resources without using their credentials. Refresh token allows users to get a new access token once it's expired/invalidated. 



## Stack


- NestJS
- Typescript
- Docker
- MongoDB
- Swagger (link: base_url/api)
- JWT (access token, refresh token, Passport strategies)
- Redis
- Postman
- React

## Test

### Postman
Use included Postman collection for testing and follow the above flow to obtain tokens, get access to protected resources, invalidate tokens, and use refresh token to get access token

### Swagger
Swagger is located in `base_url/api` and can be used to test the backend.

### Use Frontend APP
- Run React App and confirm the protected route is not working before login. 
- Register and then login to get the access tken.
- Now you can call the protected page which uses access token for authorization to get the list of users and display.
- Open Developers Tool and use the Back button in the App to keep calling the protected endpoint.
- Confirm you get auth error in dev tool logs when access token expires followed by a request to get a new access token using refresh token. This is smooth for the end user and they can keep getting the api response.
