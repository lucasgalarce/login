function login() {
    const username = document.getElementById("input-user").value;
    const password = document.getElementById("input-password").value;
    console.log(username, password);

    const userBody = JSON.stringify({
      username: username,
      password: password
    });

    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      console.log(this.responseText);

      if (this.status === 200) {
        window.location.href = "/home";
      }

    }

    xhr.open("POST", "/login");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(userBody);

  }