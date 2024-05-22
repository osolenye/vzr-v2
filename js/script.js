var exit_button = document.querySelector(".exit_button");

exit_button.style.display = "none";

var open_exit = document.querySelector(".open_exit");

var is_opened = false;
open_exit.addEventListener("click", function(event) {
    event.preventDefault();

    if (is_opened === false) {
        exit_button.style.display = "block";
        is_opened = true;
    } else {
        exit_button.style.display = "none";
        is_opened = false;
    }
});