# coursemate
## Project Overview
This backend provides APIs for managing:

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
### /admin
routes: 
- `/create` **POST** creates a course with given attributes.
- `/delete` **GET** deletes a course with given attributes.
### /course
routes:
- `/enroll` **POST** enrolls the user to a course.
- `/optout` **GET** optout the user from a given course.
- `/list` **GET** lists the courses available for the user.