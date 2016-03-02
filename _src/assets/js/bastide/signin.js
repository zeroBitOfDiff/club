if (!window.TechKnights) window.TechKnights = {};
TechKnights.signIn = function() {
  var xhr = new XMLHttpRequest();
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  xhr.open("GET", "https://script.google.com/macros/s/AKfycbxSJYmozqCFHhYSd0x3YpsFab-38NodWeqhGaSgHw5I05BaVg0/exec?Name=" + name + "&Email=" + email);
  xhr.onload = function() {
    if (xhr.responseText.indexOf("success") !== -1) {
      document.getElementById("loading").style.display = "none";
      document.getElementById("success").style.display = "block";
    } else {
      document.getElementById("loading").style.display = "none";
      document.getElementById("error").style.display = "block";
      document.getElementById("form").style.display = "block";
    }
  };
  document.getElementById("form").style.display = "none";
  document.getElementById("loading").style.display = "block";
  xhr.send();
  localStorage['name'] = name;
  localStorage['email'] = email;
}
