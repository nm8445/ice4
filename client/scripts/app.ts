"use strict";

// IIFE - Immediately Invoked Function Expression
// AKA  - Anonymous Self-Executing Function
// Any code within the IIFE is immediately and automatically invoked
(function(){
    function ContactFormValidation() {

        ValidateField("#fullName",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid first and lastname.");

        ValidateField("#contactNumber",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid phone contact number.");

        ValidateField("#emailAddress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid email address");
    }

    /**
     * Validate form fields provided by users
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */
    function ValidateField(input_field_id:string, regular_expression:RegExp, error_message:string){
        let messageArea = $("#messageArea").hide();

        //The "blur" event fires when an element has lost focus.
        $(input_field_id).on("blur", function() {
            let inputFieldText = $(this).val() as string;
            if(!regular_expression.test(inputFieldText)){
                $(this).trigger("focus").trigger("select");    // select all the text in the  fullName textbox
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }else {
                messageArea.removeAttr("class").hide();
            }
        });
    }


    /**
     * Add a new Contact to locationStorage
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     * @constructor
     */
    function AddContact(fullName:string, contactNumber:string, emailAddress:string){
         let contact = new core.Contact(fullName, contactNumber, emailAddress);
         if(contact.serialize()){
             let key = contact.fullName.substring(0,1) + Date.now();
             localStorage.setItem(key, contact.serialize() as string);
         }
    }

    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

        //Week 4-1
        $("#AboutUsBtn").on("click", () => {
            location.href = "/about";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my main paragraph</p>`)
        $("main").append(`<article class="container">
                                    <p id="ArticleParagraph" class="mt-3">This is my article paragraph</p></article>`)

    }

    function DisplayProductsPage(){
        console.log("Called DisplayProductPage()");
    }

    function DisplayAboutUsPage(){
        console.log("Called DisplayAboutUsPage()");
    }

    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage()");

        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function() {
            location.href = "/contact-list";
        });

        ContactFormValidation();

        let sendButton = document.getElementById("sendButton") as HTMLElement;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;

        sendButton.addEventListener("click", function () {
            if(subscribeCheckbox.checked){

                let fullName:string = document.forms[0].fullName.value;
                let contactNumber:string = document.forms[0].contactNumber.value;
                let emailAddress:string = document.forms[0].emailAddress.value;

                AddContact(fullName, contactNumber, emailAddress);
            }
        });
    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactList Page() ...");

        $("a.delete").on("click", function(event) {
           if(!confirm("Please confirm contact deletion?")){
               event.preventDefault();
               location.href = "/contact-list";
           }
        });

    }

    function DisplayEditPage(){
        console.log("Called DisplayEditPage()...");
        ContactFormValidation();
    }

    function DisplayServicesPage(){
        console.log("Called DisplayServicesPage()");
    }

    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function (){

            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function(data){

                //request succeeded
                for(const user of data.users) {
                    console.log(data.user);

                    let username:string = document.forms[0].username.value;
                    let password:string = document.forms[0].password.value;

                    if(username === user.Username && password === user.Password){
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }

                if(success) {
                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    location.href = "/contact-list";
                }else{
                    $("#user").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Credentials")
                        .show();
                }

                $("#cancelButton").on("click", function () {
                    document.forms[0].reset();
                    location.href = "/home";
                });


            });

        });

    }

    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");
    }

    function Display404Page(){
        console.log("Called Display404Page()");
    }

    function Start(){
        console.log("App Started");

        let page_id = $("body")[0].getAttribute("id");

        switch(page_id){
            case "home":
                DisplayHomePage();
                break;
            case "about":
                DisplayAboutUsPage();
                break;
            case "services":
                DisplayServicesPage();
                break;
            case "contact" :
                DisplayContactUsPage();
                break;
            case "contact-list":
                DisplayContactListPage();
                break;
            case "register" :
                DisplayRegisterPage();
                break;
            case "login" :
                DisplayLoginPage();
                break;
            case "edit" :
                DisplayEditPage();
                break;
            case "404" :
                Display404Page();
                break;
        }
    }
    window.addEventListener("load", Start);

})();