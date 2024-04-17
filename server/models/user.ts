"use strict"

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema:any = new Schema(
    {
        DisplayName:String,
        EmailAddress:String,
        Username:String,
        Created: {
            type: Date,
            default: Date.now()
        }
    },
    {
        collection: "users"
    }
);

UserSchema.plugin(passportLocalMongoose);
const Model = mongoose.model("User", UserSchema);

declare global
{
    export type UserDocument = mongoose.Document &
        {
            username: String,
            EmailAddress: String,
            DisplayName: String
        }
}
export default Model;