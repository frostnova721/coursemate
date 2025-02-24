# COURSEMATE

## Project Overview

Coursemate backend provides APIs for managing:

- Users: Create, read, update, and delete users. Each user can enroll in multiple courses.
- Courses: Create, read, update, and delete course details.
- User-Course Relationship: Connects users to the courses they are enrolled in through references in MongoDB.
- Admin Module: Provides administrative functions to manage courses.

## Technologies Used

- Node.js – Backend runtime environment
- Express.js – Web framework for Node.js
- MongoDB – NoSQL database for storing user and course data
- Mongoose – ODM for MongoDB
- TypeScript – Strongly typed JavaScript for better code quality

## Schema Overview

### User Schema

- id (Number, unique, required): Unique identifier for each user
- email (String, optional): User's email address
- fname (String, required): User's first name
- lname (String, required): User's last name
- courses (Array of ObjectId): References to enrolled courses

### Course Schema

- id (Number, unique, required): Unique identifier for each course
- title (String, required): Course title
- description (String, required): Course description
- category (Array of String, required): Course categories
- duration (Number, required): Duration of the course in hours

### Building

To run the project:

- Open coursemate directory in terminal or your IDE
- Run the following commands

 ```sh
npm install
npm start
```

Following these steps will download the necessary packages and runs the backend on your localhost in port **8080**

## API Endpoints

There are 3 endpoints:

- admin : manages creation/deletion of courses
- users : manages CRUD of users
- courses : manages enrollment and opting out of courses

Except the `/users` & `/token/refresh` endpoints, every other endpoints requires a authorized/logged in user

### USAGE

The following parts lists the usage guide for the endpoints.

The guide follows the format:

| `/endpoint` **<REQUEST_METHOD>** \<description>

### /admin

> All endpoints of this route requires user with an admin role

- `/courses` **POST** creates a course.

    The body of this should contain:

    | Argument | Type | Description |
    | -------- | ---- | ----------- |
    | id | number | The id of course |
    | title | string | The title of course |
    | description | string | Description of course |
    | duration | number | Duration of course (in hours) |
    | category | string[] | Categories of course |

- `/courses/{courseId}` **DELETE** deletes a course with given attributes.
- `/courses` **GET** returns the array of courses

### /course

- `/enroll` **GET** enrolls the user to a course.

    The query should contain:

    | Argument | Type | Description |
    | -------- | ---- | ----------- |
    | courseId | number | The id of course |

- `/optout` **GET** optout the user from a given course.

### /users

- `/users` **POST** creates a user object.

    The body of this should contain:

    | Argument | Type | Description |
    | -------- | ---- | ----------- |
    | id | number | user's id |
    | fname | string | user's first name |
    | lname | string | user's last name |

- `/users` **GET** returns list of user objects created.
- `/users/courses` **GET** lists the courses enrolled by the user.
- `/users` **DELETE** Deletes the currently active user

### Response Codes

- `200` : Deletion/request is successful
- `201` : POST request is succesfull
- `400` : Missing parameters
- `404` : Item with given condition doesnt exist
