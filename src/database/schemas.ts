import { Document } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { ICourse, IUser } from "./types";

const UserSchema = new Schema<IUser>({
  id: {
    type: Number,
    required: [true, "User Id is manadatory"],
    unique: true
  },
  email: {
    type: String,
    required: false,
    trim: true
  },
  fname: {
    type: String,
    required: true,
    trim: true
  },
  lname: {
    type: String,
    required: true,
    trim: true
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
});

const CourseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true
    },
    category: [
      {
        type: String,
        required: true
      }
    ],
    duration: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true,
      unique: true
    },
    studentsEnrolled: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
      }
    ]
  },
  { versionKey: false }
);

export const User = mongoose.model<IUser>("User", UserSchema);
export const Course = mongoose.model<ICourse>("Course", CourseSchema);
