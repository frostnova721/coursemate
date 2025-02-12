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

## API Endpoints

There are 3 endpoints:

- admin : manages creation/deletion of courses
- users : manages CRUD of users
- courses : manages enrollment and opting out of courses

### USAGE

The following parts lists the usage guide for the endpoints.

The guide follows the format:

| `/endpoint` **<REQUEST_METHOD>** \<description>

### /admin

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

- `/enroll` **POST** enrolls the user to a course.

    The body of this should contain:

    | Argument | Type | Description |
    | -------- | ---- | ----------- |
    | userId | number | The id of user |
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
    | email (optional) | string | user's email |
    | isAdmin (optional) | boolean | user's admin status |

- `/users` **GET** returns list of user objects created.
- `/users/{userId}/courses` **GET** lists the courses enrolled by the user.

### Response Codes

- `200` : Deletion/request is successful
- `201` : POST request is succesfull
- `400` : Missing parameters
- `404` : Item with given condition doesnt exist
