"use strict";
var core;
(function (core) {
    class User {
        _displayName;
        _emailAddress;
        _username;
        _password;
        constructor(displayName = "", emailAddress = "", username = "", password = "") {
            this._displayName = displayName;
            this._emailAddress = emailAddress;
            this._username = username;
            this._password = password;
        }
        get displayName() {
            return this._displayName;
        }
        set displayName(value) {
            this._displayName = value;
        }
        get emailAddress() {
            return this._emailAddress;
        }
        set emailAddress(value) {
            this._emailAddress = value;
        }
        get username() {
            return this._username;
        }
        set username(value) {
            this._username = value;
        }
        toString() {
            return `Display Name: ${this._displayName}\n
                    Email Address: ${this._emailAddress}\n
                    Username: ${this._username}`;
        }
        toJSON() {
            return {
                "DisplayName": this.displayName,
                "EmailAddress": this.emailAddress,
                "Username": this.username
            };
        }
        fromJSON(data) {
            this._displayName = data.displayName;
            this._emailAddress = data.emailAddress;
            this._username = data.username;
            this._password = data._password;
        }
        serialize() {
            if (this._displayName !== "" && this._emailAddress !== "" && this._username !== "") {
                return `${this._displayName}, ${this._emailAddress}, ${this._username}`;
            }
            console.error("Failed to serialize, one or more user attributes were missing");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this._displayName = propertyArray[0];
            this._emailAddress = propertyArray[1];
            this._username = propertyArray[2];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map