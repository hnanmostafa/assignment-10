"use strict";
var myLoginBtn = document.querySelector(".login-btn");
var nameValue = document.querySelector(".name-in");
var emailValue = document.querySelector(".email-in");
var passValue = document.querySelector(".pass-in");
var myProgress = document.querySelector(".progress");
var myProgressBar = document.querySelector(".progress-bar");
var loginEmail = document.querySelector(".my-login-email");
var loginPass = document.querySelector(".my-login-pass");
var mustLogin = document.querySelectorAll(".must-login");
var invalidLogin = document.querySelectorAll(".invalid-login");

var allUsers = [];
var activeUsers = [];

var mySpecialIndex;

if (localStorage.getItem("allUsers") !== null) {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}
if (localStorage.getItem("activeUsers") !== null) {
  activeUsers = JSON.parse(localStorage.getItem("activeUsers"));
}

var cartona = "";
function showActiveUsers() {
  for (var i = 0; i < activeUsers.length; i++) {
    cartona += `<option value="${activeUsers[i].activeEmail}"  class="my-option"></option>`;
  }
  document.querySelector("#my-active-email").innerHTML = cartona;
}
showActiveUsers();

function showMyPass() {
  var emailValue = loginEmail.value;
  var optionArrays = document.querySelectorAll(".my-option");
  for (var i = 0; i < optionArrays.length; i++) {
    if (emailValue == optionArrays[i].value) {
      for (var i = 0; i < activeUsers.length; i++)
        if (activeUsers[i].activeEmail == emailValue) {
          loginPass.value = activeUsers[i].activePass;
        }
    }
  }
}
var mustArray = document.querySelectorAll(".must");
var wrongArray = document.querySelectorAll(".wrong");
var doneArray = document.querySelectorAll(".done");

function validEmailDublicate() {
  for (var i = 0; i < allUsers.length; i++) {
    if (emailValue.value.toLowerCase() == allUsers[i].email) {
      return true;
    }
  }
  return false;
}

// Validate My Email
function validateEmail() {
  mustArray[1].classList.add("hidden");
  if (myEmailRegex.test(emailValue.value)) {
    doneArray[1].classList.remove("hidden");
    document.querySelector(".example").classList.add("hidden");
    if (!validEmailDublicate()) {
      doneArray[1].classList.remove("hidden");
      return true;
    } else {
      return false;
    }
    return true;
  } else {
    document.querySelector(".example").classList.remove("hidden");
    return false;
  }
}
// Remove Warning when start writting
emailValue.addEventListener("keydown", function () {
  document.querySelector(".example").classList.add("hidden");
  mustArray[1].classList.add("hidden");
  document.querySelector(".all-done").classList.add("hidden");
});
// Remove Warning when start writting
nameValue.addEventListener("keydown", function () {
  mustArray[0].classList.add("hidden");
  document.querySelector(".all-done").classList.add("hidden");
});
// Remove Warning when start writting
loginEmail.addEventListener("keydown", function () {
  mustLogin[0].classList.add("hidden");
  invalidLogin[0].classList.add("hidden");
});
// Remove Warning when start writting
loginPass.addEventListener("keydown", function () {
  mustLogin[1].classList.add("hidden");
  invalidLogin[1].classList.add("hidden");
});

var myEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Visible Password
document
  .querySelector(".my-eye-icon-invisib1")
  .addEventListener("click", function () {
    document.querySelector(".my-eye-icon-invisib1").classList.toggle("hidden");
    document.querySelector(".my-eye-icon-visib1").classList.toggle("hidden");
    document.querySelector(".signupPass").type = "text";
  });
document
  .querySelector(".my-eye-icon-visib1")
  .addEventListener("click", function () {
    document.querySelector(".my-eye-icon-invisib1").classList.toggle("hidden");
    document.querySelector(".my-eye-icon-visib1").classList.toggle("hidden");
    document.querySelector(".signupPass").type = "password";
  });
document
  .querySelector(".my-eye-icon-invisib2")
  .addEventListener("click", function () {
    document.querySelector(".my-eye-icon-invisib2").classList.toggle("hidden");
    document.querySelector(".my-eye-icon-visib2").classList.toggle("hidden");
    document.querySelector(".my-login-pass").type = "text";
  });
document
  .querySelector(".my-eye-icon-visib2")
  .addEventListener("click", function () {
    document.querySelector(".my-eye-icon-invisib2").classList.toggle("hidden");
    document.querySelector(".my-eye-icon-visib2").classList.toggle("hidden");
    document.querySelector(".my-login-pass").type = "password";
  });
// Sign up Btn
myLoginBtn.addEventListener("click", validateAdding);
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    validateAdding();
  }
});
function validateAdding() {
  var user = {
    myName: nameValue.value,
    email: emailValue.value.toLowerCase(),
    pass: passValue.value,
  };
  if (!user.email && !user.pass && !user.myName) {
    mustArray[0].classList.remove("hidden");
    mustArray[1].classList.remove("hidden");
    mustArray[2].classList.remove("hidden");
  } else if (!user.email && !user.pass && user.myName) {
    doneArray[0].classList.remove("hidden");
    mustArray[1].classList.remove("hidden");
    mustArray[2].classList.remove("hidden");
  } else if (user.email && !user.pass && !user.myName) {
    mustArray[0].classList.remove("hidden");
    mustArray[2].classList.remove("hidden");
    validateEmail();
  } else if (!user.email && user.pass && !user.myName) {
    mustArray[0].classList.remove("hidden");
    mustArray[1].classList.remove("hidden");
  } else if (!user.email && user.pass && user.myName) {
    doneArray[0].classList.remove("hidden");
    mustArray[1].classList.remove("hidden");
  } else if (user.email && user.pass && !user.myName) {
    mustArray[0].classList.remove("hidden");
    validateEmail();
  } else if (user.email && !user.pass && user.myName) {
    doneArray[0].classList.remove("hidden");
    validateEmail();
    mustArray[2].classList.remove("hidden");
  } else if (user.email && user.pass && user.myName) {
    doneArray[0].classList.remove("hidden");
    if (
      !validateEmail() &&
      document.querySelector(".good-password").classList.contains("hidden")
    ) {
      mustArray[1].classList.add("hidden");
    } else if (
      validateEmail() &&
      document.querySelector(".good-password").classList.contains("hidden")
    ) {
      doneArray[1].classList.remove("hidden");
    } else if (
      !validateEmail() &&
      !document.querySelector(".good-password").classList.contains("hidden")
    ) {
      mustArray[1].classList.add("hidden");
    } else if (
      validateEmail() &&
      !document.querySelector(".good-password").classList.contains("hidden")
    ) {
      allUsers.push(user);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
      doneArray[0].classList.add("hidden");
      doneArray[1].classList.add("hidden");
      myProgressBar.classList.add("hidden");
      myProgress.classList.add("hidden");
      document.querySelector(".my-list").classList.add("hidden");
      document.querySelector(".correct-validate").classList.add("hidden");
      document.querySelector(".all-done").classList.remove("hidden");
      nameValue.value = "";
      emailValue.value = "";
      passValue.value = "";
    }
  }
}

/****************************************************/
// I have 4 conditions: 1- At Least one capital alpha
//                      2- At Least one small alpha
//                      3- At Least one number
//                      4- At Least 8 charachrer
// if you make 2 condition or less your password is bad
// if you make 3 condition your password is medium
// if you make 4 condition or less your password is good
// you will sign up in case your password is good
var myPassRegexLevelOne1 = /^.{1,}$/;
var myPassRegexLevelOne2 = /^(?=.*[a-z]).{1,}$/;
var myPassRegexLevelOne3 = /^(?=.*[A-Z]).{1,}$/;
var myPassRegexLevelOne5 = /^.{8,}$/;
var myPassRegexLevelOne6 = /^(?=.*\d)(?=.*[a-z]).{1,7}$/;
var myPassRegexLevelOne7 = /^(?=.*\d)(?=.*[A-Z]).{1,7}$/;
var myPassRegexLevelOne8 = /^(?=.*\d).{1,7}$/;
var myPassRegexLevelOne9 = /^(?=.*\d).{8,}$/;
var myPassRegexLevelOne4 = /^$/;
var myPassRegexLevelTwo = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
var myPassRegexLevelThree = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
var myPassRegexLevelThree1 = /^(?=.*\d)(?=.*[A-Z]).{8,}$/;
var myPassRegexLevelThree2 = /^(?=.*\d)(?=.*[a-z]).{8,}$/;
var myPassRegexLevelThree3 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,}$/;
passValue.addEventListener("keyup", function validtePowerOfPass() {
  document.querySelector(".all-done").classList.add("hidden");
  mustArray[2].classList.add("hidden");
  myProgress.classList.remove("hidden");
  myProgressBar.classList.remove("hidden");
  // Good Case
  if (myPassRegexLevelTwo.test(passValue.value)) {
    document.querySelector(".bad-validate").classList.add("hidden");
    myProgress.classList.remove("hidden");
    myProgressBar.classList.add("good");
    document.querySelector(".correct-validate").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("hidden");
    document.querySelector(".my-list").classList.add("correct");
    document.querySelector(".medium-validate").classList.add("hidden");
    document.querySelector(".digit-pa").classList.remove("invalid");
    document.querySelectorAll(".my-check")[0].classList.remove("hidden");
    document.querySelectorAll(".my-check")[1].classList.remove("hidden");
    document.querySelectorAll(".my-check")[2].classList.remove("hidden");
    document.querySelectorAll(".my-check")[3].classList.remove("hidden");
    document.querySelectorAll("li")[0].classList.add("correct");
    document.querySelectorAll("li")[1].classList.add("correct");
    document.querySelectorAll("li")[2].classList.add("correct");
    document.querySelectorAll("li")[3].classList.add("correct");
    document.querySelectorAll("li")[0].classList.remove("invalid");
    document.querySelectorAll("li")[1].classList.remove("invalid");
    document.querySelectorAll("li")[2].classList.remove("invalid");
    document.querySelectorAll("li")[3].classList.remove("invalid");
  }
  // Medium Part 1
  else if (myPassRegexLevelThree.test(passValue.value)) {
    myProgressBar.classList.remove("good");
    myProgress.classList.remove("hidden");
    myProgressBar.classList.add("medium");
    document.querySelector(".correct-validate").classList.add("hidden");
    document.querySelector(".bad-validate").classList.add("hidden");
    document.querySelector(".medium-validate").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("invalid");
    document.querySelector(".my-list").classList.add("correct");
    document.querySelectorAll("li")[1].classList.remove("invalid");

    document.querySelector(".digit-pa").classList.add("invalid");
    document.querySelectorAll(".my-check")[0].classList.remove("hidden");
    document.querySelectorAll(".my-check")[1].classList.remove("hidden");
    document.querySelectorAll(".my-check")[2].classList.remove("hidden");
    document.querySelectorAll(".my-check")[3].classList.add("hidden");
  }
  // Medium Part 2
  else if (myPassRegexLevelThree1.test(passValue.value)) {
    myProgressBar.classList.remove("good");
    myProgress.classList.remove("hidden");
    myProgressBar.classList.add("medium");
    document.querySelector(".correct-validate").classList.add("hidden");
    document.querySelector(".bad-validate").classList.add("hidden");
    document.querySelector(".medium-validate").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("invalid");
    document.querySelector(".my-list").classList.add("correct");
    document.querySelectorAll("li")[0].classList.remove("invalid");
    document.querySelectorAll("li")[0].classList.add("correct");
    document.querySelectorAll("li")[1].classList.remove("invalid");
    document.querySelectorAll("li")[2].classList.remove("correct");
    document.querySelectorAll("li")[2].classList.add("invalid");
    document.querySelectorAll("li")[3].classList.remove("invalid");
    document.querySelectorAll("li")[3].classList.add("correct");

    document.querySelectorAll(".my-check")[0].classList.remove("hidden");
    document.querySelectorAll(".my-check")[1].classList.remove("hidden");
    document.querySelectorAll(".my-check")[2].classList.add("hidden");
    document.querySelectorAll(".my-check")[3].classList.remove("hidden");
  }
  // Medium Part 3
  else if (myPassRegexLevelThree2.test(passValue.value)) {
    myProgressBar.classList.remove("good");
    myProgress.classList.remove("hidden");
    myProgressBar.classList.add("medium");
    document.querySelector(".correct-validate").classList.add("hidden");
    document.querySelector(".bad-validate").classList.add("hidden");
    document.querySelector(".medium-validate").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("invalid");
    document.querySelector(".my-list").classList.add("correct");
    document.querySelectorAll("li")[0].classList.remove("invalid");
    document.querySelectorAll("li")[0].classList.add("correct");
    document.querySelectorAll("li")[1].classList.add("invalid");
    document.querySelectorAll("li")[1].classList.remove("correct");
    document.querySelectorAll("li")[2].classList.add("correct");
    document.querySelectorAll("li")[2].classList.remove("invalid");
    document.querySelectorAll("li")[3].classList.remove("invalid");
    document.querySelectorAll("li")[3].classList.add("correct");

    document.querySelectorAll(".my-check")[0].classList.remove("hidden");
    document.querySelectorAll(".my-check")[1].classList.add("hidden");
    document.querySelectorAll(".my-check")[2].classList.remove("hidden");
    document.querySelectorAll(".my-check")[3].classList.remove("hidden");
  }
  // Medium Part 4
  else if (myPassRegexLevelThree3.test(passValue.value)) {
    myProgressBar.classList.remove("good");
    myProgress.classList.remove("hidden");
    myProgressBar.classList.add("medium");
    document.querySelector(".correct-validate").classList.add("hidden");
    document.querySelector(".bad-validate").classList.add("hidden");
    document.querySelector(".medium-validate").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("invalid");
    document.querySelector(".my-list").classList.add("correct");
    document.querySelectorAll("li")[0].classList.add("invalid");
    document.querySelectorAll("li")[0].classList.remove("correct");
    document.querySelectorAll("li")[1].classList.remove("invalid");
    document.querySelectorAll("li")[1].classList.add("correct");
    document.querySelectorAll("li")[2].classList.add("correct");
    document.querySelectorAll("li")[2].classList.remove("invalid");
    document.querySelectorAll("li")[3].classList.remove("invalid");
    document.querySelectorAll("li")[3].classList.add("correct");

    document.querySelectorAll(".my-check")[0].classList.add("hidden");
    document.querySelectorAll(".my-check")[1].classList.remove("hidden");
    document.querySelectorAll(".my-check")[2].classList.remove("hidden");
    document.querySelectorAll(".my-check")[3].classList.remove("hidden");
  }

  // Bad  Case part 3
  else if (myPassRegexLevelOne1.test(passValue.value)) {
    document.querySelector(".correct-validate").classList.add("hidden");
    myProgressBar.classList.remove("progress-zero");
    myProgress.classList.remove("hidden");
    myProgressBar.classList.remove("medium");
    myProgressBar.classList.remove("good");
    myProgressBar.classList.add("bad");
    document.querySelector(".medium-validate").classList.add("hidden");
    document.querySelector(".bad-validate").classList.remove("hidden");
    document.querySelector(".my-list").classList.remove("hidden");
    document.querySelector(".my-list").classList.add("invalid");
    document.querySelectorAll("li")[3].classList.add("invalid");
    document.querySelectorAll("li")[0].classList.add("invalid");

    document.querySelectorAll(".my-check")[0].classList.add("hidden");
    document.querySelectorAll(".my-check")[1].classList.add("hidden");
    document.querySelectorAll(".my-check")[2].classList.add("hidden");
    document.querySelectorAll(".my-check")[3].classList.add("hidden");
    if (myPassRegexLevelOne7.test(passValue.value)) {
      myProgressBar.classList.remove("good");
      myProgress.classList.remove("hidden");
      myProgressBar.classList.remove("medium");
      myProgressBar.classList.add("bad");
      document.querySelector(".correct-validate").classList.add("hidden");
      document.querySelector(".bad-validate").classList.remove("hidden");
      document.querySelector(".medium-validate").classList.add("hidden");
      document.querySelector(".my-list").classList.remove("hidden");
      document.querySelectorAll("li")[0].classList.add("invalid");
      document.querySelectorAll("li")[0].classList.remove("correct");
      document.querySelectorAll("li")[1].classList.remove("invalid");
      document.querySelectorAll("li")[1].classList.add("correct");
      document.querySelectorAll("li")[2].classList.remove("correct");
      document.querySelectorAll("li")[2].classList.add("invalid");
      document.querySelectorAll("li")[3].classList.remove("invalid");
      document.querySelectorAll("li")[3].classList.add("correct");

      document.querySelectorAll(".my-check")[0].classList.add("hidden");
      document.querySelectorAll(".my-check")[1].classList.remove("hidden");
      document.querySelectorAll(".my-check")[2].classList.add("hidden");
      document.querySelectorAll(".my-check")[3].classList.remove("hidden");
    }
    if (myPassRegexLevelOne6.test(passValue.value)) {
      myProgressBar.classList.remove("good");
      myProgress.classList.remove("hidden");
      myProgressBar.classList.remove("medium");
      myProgressBar.classList.add("bad");
      document.querySelector(".correct-validate").classList.add("hidden");
      document.querySelector(".bad-validate").classList.remove("hidden");
      document.querySelector(".medium-validate").classList.add("hidden");
      document.querySelector(".my-list").classList.remove("hidden");
      document.querySelectorAll("li")[0].classList.add("invalid");
      document.querySelectorAll("li")[0].classList.remove("correct");
      document.querySelectorAll("li")[1].classList.add("invalid");
      document.querySelectorAll("li")[1].classList.remove("correct");
      document.querySelectorAll("li")[2].classList.add("correct");
      document.querySelectorAll("li")[2].classList.remove("invalid");
      document.querySelectorAll("li")[3].classList.remove("invalid");
      document.querySelectorAll("li")[3].classList.add("correct");

      document.querySelectorAll(".my-check")[0].classList.add("hidden");
      document.querySelectorAll(".my-check")[1].classList.add("hidden");
      document.querySelectorAll(".my-check")[2].classList.remove("hidden");
      document.querySelectorAll(".my-check")[3].classList.remove("hidden");
    } else if (
      myPassRegexLevelOne2.test(passValue.value) &&
      myPassRegexLevelOne3.test(passValue.value)
    ) {
      document.querySelectorAll("li")[1].classList.add("correct");
      document.querySelectorAll("li")[2].classList.add("correct");
      document.querySelectorAll("li")[1].classList.remove("invalid");
      document.querySelectorAll("li")[2].classList.remove("invalid");
      document.querySelectorAll(".my-check")[1].classList.remove("hidden");
      document.querySelectorAll(".my-check")[2].classList.remove("hidden");
    } else if (
      myPassRegexLevelOne2.test(passValue.value) &&
      !myPassRegexLevelOne3.test(passValue.value)
    ) {
      document.querySelectorAll("li")[1].classList.remove("correct");
      document.querySelectorAll("li")[1].classList.add("invalid");
      document.querySelectorAll(".my-check")[1].classList.add("hidden");
      document.querySelectorAll("li")[2].classList.remove("invalid");
      document.querySelectorAll("li")[2].classList.add("correct");
      document.querySelectorAll(".my-check")[2].classList.remove("hidden");
      if (myPassRegexLevelOne5.test(passValue.value)) {
        document.querySelectorAll("li")[0].classList.add("correct");
        document.querySelectorAll(".my-check")[0].classList.remove("hidden");
        document.querySelectorAll("li")[0].classList.add("correct");
        document.querySelectorAll("li")[0].classList.remove("invalid");
      }
    } else if (
      !myPassRegexLevelOne2.test(passValue.value) &&
      myPassRegexLevelOne3.test(passValue.value)
    ) {
      document.querySelectorAll("li")[1].classList.add("correct");
      document.querySelectorAll("li")[1].classList.remove("invalid");
      document.querySelectorAll(".my-check")[1].classList.remove("hidden");
      document.querySelectorAll("li")[2].classList.remove("correct");
      document.querySelectorAll(".my-check")[2].classList.add("hidden");
      if (myPassRegexLevelOne5.test(passValue.value)) {
        document.querySelectorAll("li")[0].classList.add("correct");
        document.querySelectorAll(".my-check")[0].classList.remove("hidden");
        document.querySelectorAll("li")[0].classList.add("correct");
        document.querySelectorAll("li")[0].classList.remove("invalid");
      }
    } else if (myPassRegexLevelOne8.test(passValue.value)) {
      myProgressBar.classList.remove("good");
      myProgress.classList.remove("hidden");
      myProgressBar.classList.remove("medium");
      myProgressBar.classList.add("bad");
      document.querySelector(".correct-validate").classList.add("hidden");
      document.querySelector(".bad-validate").classList.remove("hidden");
      document.querySelector(".medium-validate").classList.add("hidden");
      document.querySelector(".my-list").classList.remove("hidden");
      document.querySelectorAll("li")[0].classList.add("invalid");
      document.querySelectorAll("li")[0].classList.remove("correct");
      document.querySelectorAll("li")[1].classList.add("invalid");
      document.querySelectorAll("li")[1].classList.remove("correct");
      document.querySelectorAll("li")[2].classList.remove("correct");
      document.querySelectorAll("li")[2].classList.add("invalid");
      document.querySelectorAll("li")[3].classList.remove("invalid");
      document.querySelectorAll("li")[3].classList.add("correct");

      document.querySelectorAll(".my-check")[0].classList.add("hidden");
      document.querySelectorAll(".my-check")[1].classList.add("hidden");
      document.querySelectorAll(".my-check")[2].classList.add("hidden");
      document.querySelectorAll(".my-check")[3].classList.remove("hidden");
    } else if (myPassRegexLevelOne9.test(passValue.value)) {
      myProgressBar.classList.remove("good");
      myProgress.classList.remove("hidden");
      myProgressBar.classList.remove("medium");
      myProgressBar.classList.add("bad");
      document.querySelector(".correct-validate").classList.add("hidden");
      document.querySelector(".bad-validate").classList.remove("hidden");
      document.querySelector(".medium-validate").classList.add("hidden");
      document.querySelector(".my-list").classList.remove("hidden");
      document.querySelectorAll("li")[0].classList.remove("invalid");
      document.querySelectorAll("li")[0].classList.add("correct");
      document.querySelectorAll("li")[1].classList.add("invalid");
      document.querySelectorAll("li")[1].classList.remove("correct");
      document.querySelectorAll("li")[2].classList.remove("correct");
      document.querySelectorAll("li")[2].classList.add("invalid");
      document.querySelectorAll("li")[3].classList.remove("invalid");
      document.querySelectorAll("li")[3].classList.add("correct");

      document.querySelectorAll(".my-check")[0].classList.remove("hidden");
      document.querySelectorAll(".my-check")[1].classList.add("hidden");
      document.querySelectorAll(".my-check")[2].classList.add("hidden");
      document.querySelectorAll(".my-check")[3].classList.remove("hidden");
    }
    // Bad part 2
  }

  // No thing Case  Case
  else if (myPassRegexLevelOne4.test(passValue.value)) {
    myProgressBar.classList.remove("medium");
    myProgressBar.classList.remove("good");
    myProgressBar.classList.add("progress-zero");
    document.querySelector(".my-list").classList.add("hidden");
    myProgress.classList.add("hidden");
    myProgressBar.classList.add("hidden");
    document.querySelector(".bad-validate").classList.add("hidden");
    document.querySelector(".correct-validate").classList.add("hidden");
    document.querySelector(".medium-validate").classList.add("hidden");
    document.querySelectorAll("li")[0].classList.remove("correct");
    document.querySelectorAll(".my-check")[0].classList.add("hidden");
  }
});

/****************Handle Login**********************/

document.querySelector(".my-login-btn").addEventListener("click", function () {
  document.querySelector(".my-singup-section").classList.add("hidden");
  document.querySelector(".my-login-section").classList.remove("hidden");
});

document.querySelector(".my-signup-btn").addEventListener("click", function () {
  document.querySelector(".my-login-section").classList.add("hidden");
  document.querySelector(".my-singup-section").classList.remove("hidden");
});
var correctLogin = document.querySelectorAll(".correct-login");
document.querySelector(".signup-btn").addEventListener("click", function () {
  var loginPass = document.querySelector(".my-login-pass");
  var loginEmail = document.querySelector(".my-login-email");
  if (!loginEmail.value && !loginPass.value) {
    mustLogin[0].classList.remove("hidden");
    mustLogin[1].classList.remove("hidden");
  } else if (loginEmail.value && !loginPass.value) {
    mustLogin[0].classList.add("hidden");
    mustLogin[1].classList.remove("hidden");
    validLoginEmail();
  } else if (!loginEmail.value && loginPass.value) {
    mustLogin[0].classList.remove("hidden");
    mustLogin[1].classList.add("hidden");
    validLoginPass();
  } else if (loginEmail.value && loginPass.value) {
    mustLogin[0].classList.add("hidden");
    mustLogin[1].classList.add("hidden");
    if (validLoginEmail() && validLoginPass()) {
      addActiveLogin();
      location.replace(addDataURL());
    } else if (!validLoginEmail() && validLoginPass()) {
      correctLogin[1].classList.add("hidden");
      invalidLogin[1].classList.add("hidden");
    } else {
      validLoginEmail();
      validLoginPass();
    }
  }
});
var activeUser;
// هنا انا محتاج يكون عندي داتا بيز اصلا غير اللوكال عشان البروسار بتاع اليوزر يخزن الايميل بتاعه فى اللوكال وكل الاكونتات بتاعت الناس التانية تتخزن فى الداتا بيز فانا هما هعمل مصفوفة جديدة جوه اللوكال
function addActiveLogin() {
  activeUser = {
    activePass: allUsers[mySpecialIndex].pass,
    activeEmail: allUsers[mySpecialIndex].email,
    activeName: allUsers[mySpecialIndex].myName,
  };
  if (activeUsers.length == 0) {
    // console.log("My Name");
    activeUsers.push(activeUser);
    localStorage.setItem("activeUsers", JSON.stringify(activeUsers));
  } else {
    let myValForUsers;
    for (var i = 0; i < activeUsers.length; i++) {
      if (!(activeUsers[i].activeEmail == activeUser.activeEmail)) {
      }
    }
    activeUsers.push("activeUsers");
    localStorage.setItem("activeUsers", JSON.stringify(activeUsers));
  }
}

function validLoginPass() {
  for (var i = 0; i < allUsers.length; i++) {
    if (loginPass.value === allUsers[i].pass) {
      correctLogin[1].classList.remove("hidden");
      return true;
    }
  }
  correctLogin[1].classList.add("hidden");
  invalidLogin[1].classList.remove("hidden");
}
function validLoginEmail() {
  for (var i = 0; i < allUsers.length; i++) {
    if (loginEmail.value.toLowerCase() === allUsers[i].email) {
      correctLogin[0].classList.remove("hidden");
      mySpecialIndex = i;
      return true;
    }
  }
  correctLogin[0].classList.add("hidden");
  invalidLogin[0].classList.remove("hidden");
}

/************Handle My Url**************/
function addDataURL() {
  var urlArray = window.location.pathname.split("/");
  urlArray.splice(urlArray.length - 1, 1, "home.html");
  var myIndexURL = " ";
  for (var i = 1; i < urlArray.length; i++) {
    if (i === urlArray.length - 1) {
      myIndexURL = myIndexURL + urlArray[i];
    } else {
      myIndexURL = myIndexURL + urlArray[i] + "/";
    }
  }
  myIndexURL = myIndexURL + `?myIndex=${mySpecialIndex}`;
  return myIndexURL;
}

/*************If you are in main you can not go to home by using forward arrow in the browser****************/

// forward arrow لما ادوس على

// window.history.forward();
// function preventBack() {
//   window.history.go(-1);
// }

// setTimeout("preventBack()", 0);
// history.pushState(null, null, location.href);
// window.onpopstate = function () {
//   history.go(1);
// };

// function first() {
//   console.log("first");
//   if (true) {
//     function second() {
//       console.log("Second");
//     }
//   }
//   second();
// }
// first();

// function first() {
//   let x = 5;
//   function second() {
//     let x = 4;
//   }
//   second();
//   console.log(x);
// }

// first();
