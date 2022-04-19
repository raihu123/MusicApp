window.onload = function (event) {
  // alert('hi');
  document.getElementById("logout-btn").disabled = true;
}


async function validate() {
  // alert('hi');
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // console.log(username, password, 'login print');

  var myHeaders = new Headers();
  // myHeaders.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // myHeaders.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  myHeaders.append("username", username);
  myHeaders.append("password", password);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders
    // redirect: 'follow',
    // mode: 'no-cors'
  };

  let r = undefined
  await fetch("http://localhost:3000/authentication/", requestOptions)
    .then(response => response.text())
    .then(result => {
      r = result;
      console.log(result);
    })
    .catch(error => console.log('error', error));

  console.log(result);

  // if (username == "k" && password == "123") {
  //   alert("Login successfully");
  //   window.location = "success.html"; // Redirecting to other page.
  //   return false;
  // } else {
  //   attempt--;// Decrementing by one.
  //   alert("You have left " + attempt + " attempt;");
// Disabling fields after 3 attempts.
//     if (attempt == 0) {
//       document.getElementById("username").disabled = true;
//       document.getElementById("password").disabled = true;
//       document.getElementById("login-btn").disabled = true;
//       return false;
//     }
//   }
}
