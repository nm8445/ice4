"use strict";

namespace core {

    export class User {

        private _displayName:string;
        private _emailAddress:string;
        private _username:string;
        private _password:string;


        constructor(displayName:string = "", emailAddress:string ="",
                    username:string ="", password:string = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }

        public get displayName():string {
            return this._displayName;
        }

        public set displayName(value:string) {
            this._displayName = value;
        }

        public get emailAddress():string{
            return this._emailAddress;
        }

        public set emailAddress(value:string) {
            this._emailAddress = value;
        }

        public get username():string {
            return this._username;
        }

        public set username(value:string) {
            this._username = value;
        }

        public toString() :string{
            return `Display Name: ${this._displayName}\n
                    Email Address: ${this._emailAddress}\n
                    Username: ${this._username}`;
        }

        public toJSON() : {Username:string; DisplayName:string; EmailAddress:string} {
            return {
                "DisplayName" : this.displayName,
                "EmailAddress" : this.emailAddress,
                "Username": this.username
            }
        }

        public fromJSON(data:User){
            this._displayName = data.displayName;
            this._emailAddress = data.emailAddress;
            this._username = data.username;
            this._password = data._password;
        }

        public serialize():string|null{
            if(this._displayName !== "" && this._emailAddress !== "" && this._username !== ""){
                return  `${this._displayName}, ${this._emailAddress}, ${this._username}`;
            }
            console.error("Failed to serialize, one or more user attributes were missing");
            return null;
        }

        public deserialize(data:string) {
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
        }

    }
}