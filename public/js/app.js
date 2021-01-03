const formData = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

formData.addEventListener("submit", (e) => {
  fetch("http://localhost:3000/weather?address=" + search.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo.textContent = "";
          return;
        }
        messageOne.textContent = "Forcast: " + data.forcast;
        messageTwo.textContent = "Location: " + data.location;
      });
    }
  );
  e.preventDefault();
});
