/**************Handle Log out*****************/
// var urlArray = window.location.pathname.split("/");
// urlArray.splice(urlArray.length - 1, 1, "index.html");
// var myIndexURL = " ";
// for (var i = 1; i < urlArray.length; i++) {
//   if (i === urlArray.length - 1) {
//     myIndexURL = myIndexURL + urlArray[i];
//   } else {
//     myIndexURL = myIndexURL + urlArray[i] + "/";
//   }
// }

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
IndexOfURL = urlParams.get("myIndex");

document.querySelector("h1").innerHTML = `Welcome ${
  JSON.parse(localStorage.getItem("allUsers"))[IndexOfURL].myName
}`;

document.querySelector(".my-logout-btn").addEventListener("click", function () {
  window.location = "./index.html";
});

function disableBack() {
  window.history.forward();
}
setTimeout("disableBack()", 0);

/*********/
