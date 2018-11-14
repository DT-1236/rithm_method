const api_key = "dc6zaTOxFJmzC";

$(() => {
  $("[name='searchButton']").click(getGif);
  $("[name='removeButton']").click(clearGifs);
  $(".wrapper").on("click", "img", e => e.target.remove());
  $(document).ajaxError((event, request, settings) => {
    alert(`Giphy might be down`);
    console.log(event, request, settings);
  });
});

function clearGifs(event) {
  event.preventDefault();
  $(".wrapper").empty();
}

function getGif(event) {
  event.preventDefault();
  let q = $("input").val();
  $.getJSON("http://api.giphy.com/v1/gifs/search", { api_key, q }, appendGif);
  $("form").trigger("reset");
}

function appendGif(response) {
  let randomIndex = Math.floor(Math.random() * response.data.length);
  let url = response.data[randomIndex].images.downsized.url;
  $(".wrapper").append($(`<img class='m-2' src='${url}'>`));
}
