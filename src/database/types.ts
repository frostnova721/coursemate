import mongoose from "mongoose";

export interface ICourse {
    id: number;
    title: string; //course title ofcourse
    description: string;
    category: string[];
    duration: number; // in days 
}

export interface IUser {
    id: number;
    fname: string;
    lname: string;
    courses: mongoose.Types.ObjectId[];
    email?: string;
}