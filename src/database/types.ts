import mongoose from "mongoose";

export interface ICourse {
    id: number;
    title: string; //course title ofcourse
    description: string;
    category: string[];
    duration: number; // in hours
}

export interface IUser {
    id: number;
    fname: string;
    lname: string;
    courses: mongoose.Types.ObjectId[];
    email?: string;
    isAdmin?: boolean;
}

// Payload for JWT
export interface IUserPayload {
    id: number;
    fname: string;
    lname: string;
    isAdmin: boolean;
}