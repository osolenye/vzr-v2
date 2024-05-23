var countries = document.querySelector(".countries");
// URL, к которому будет отправлен GET-запрос
const url = "https://api.insurance.kg/crm_test/api_business/territories/";
// const url = "http://212.112.103.137:88/api_business/territories/"

// Выполнение GET-запроса с использованием fetch и добавлением заголовков
fetch(url, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json', // пример заголовка
        // 'Authorization': 'Bearer ' + localStorage.getItem("accessToken") // пример заголовка с токеном авторизации
        // Здесь вы можете добавить другие необходимые заголовки
    }
})
    .then(response => {
        // Проверка статуса ответа
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Возвращаем данные в формате JSON
        return response.json();
    })
    .then(data => {
        // Обработка полученных данных
        data.forEach(function (country) {
            const link = document.createElement('a');
            link.href = '#'; // Устанавливаем href, как требуется в задаче
            link.textContent = country.name;
            link.classList.add('country_option'); // Добавляем класс 'country_option'
            link.id = country.id;
            countries.appendChild(link);
        });

        var country_options = document.querySelectorAll(".country_option");

        var travel_country = document.querySelector(".travel_country");
        var search_country = "";
        travel_country.addEventListener("input", function (event) {
            search_country = travel_country.value;

            country_options.forEach(function (country_option) {
                if (!country_option.innerHTML.toLowerCase().includes(search_country.toLowerCase())) {
                    country_option.style.display = "none";
                } else {
                    country_option.style.display = "block";
                }
            });
        });

        country_options.forEach(function (country_option) {
            country_option.addEventListener("click", function (event) {
                event.preventDefault();

                travel_country.value = country_option.innerHTML;
                chosen_country_id = country_option.id;
                localStorage.setItem("chosen_country_id", chosen_country_id);
                countries.style.display = "none";



                // URL, к которому будет отправлен GET-запрос
                const url_get_summs = 'https://api.insurance.kg/travel_agency/api/get_insurance_summ/?country=' + chosen_country_id;

                // Выполнение GET-запроса с использованием fetch и добавлением заголовков
                fetch(url_get_summs, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // пример заголовка
                        'Authorization': 'Bearer ' + localStorage.getItem("accessToken") // пример заголовка с токеном авторизации
                        // Здесь вы можете добавить другие необходимые заголовки
                    }
                })
                    .then(response => {
                        // Проверка статуса ответа
                        if (!response.ok) {
                            console.log(response.json);
                            throw new Error('Network response was not ok');
                        }
                        // Возвращаем данные в формате JSON
                        return response.json();
                    })
                    .then(data => {
                        // Обработка полученных данных
                        var fieldset = document.querySelector("fieldset");

                        // Удаляем все текущие элементы label_summ
                        while (fieldset.firstChild) {
                            fieldset.removeChild(fieldset.firstChild);
                        }


                        data.forEach(function (summ) {

                            // Создаем элементы
                            const label = document.createElement('label');
                            label.classList.add('label_summ');

                            const divCheckboxWrapper = document.createElement('div');
                            divCheckboxWrapper.classList.add('checkbox_wrapper');

                            const input = document.createElement('input');
                            input.type = 'radio';
                            input.classList.add('input_summ');
                            input.name = 'summ_group';

                            const spanCustomCheckbox = document.createElement('span');
                            spanCustomCheckbox.classList.add('custom_checkbox');

                            const innerLabel = document.createElement('label');
                            innerLabel.classList.add('summ');
                            innerLabel.textContent = summ.insurance_summ;
                            innerLabel.id = summ.id;
                            localStorage.setItem("chosen_price_id", summ.id);

                            // Собираем элементы вместе
                            divCheckboxWrapper.appendChild(input);
                            divCheckboxWrapper.appendChild(spanCustomCheckbox);
                            divCheckboxWrapper.appendChild(innerLabel);

                            label.appendChild(divCheckboxWrapper);

                            // Добавляем созданный элемент в DOM
                            fieldset.appendChild(label);
                        });
                    })
                    .catch(error => {
                        // Обработка ошибок
                        console.error('There was a problem with the fetch operation:', error);
                    });
            });
        });
        travel_country.addEventListener("focus", function () {
            countries.style.display = "flex";
        });
    })
    .catch(error => {
        // Обработка ошибок
        console.error('There was a problem with the fetch operation:', error);
    });

var form_sums = document.querySelector(".form_summs");
form_sums.addEventListener("submit", function (event) {
    event.preventDefault();

    var date_begin = document.getElementById("date_begin");
    var date_end = document.getElementById("date_end");
    localStorage.setItem("date_begin", date_begin.value);
    localStorage.setItem("date_end", date_end.value);

    var formData = {
        start_date: date_begin.value,
        end_date: date_end.value,
        territory: localStorage.getItem("chosen_country_id"),
        sum_insured: localStorage.getItem("chosen_price"),
        travel_goal: localStorage.getItem("travelGoal"),
        currency_letter_code: localStorage.getItem("currency"),
    }
    console.log(JSON.stringify(formData));

    localStorage.setItem("first_stage", JSON.stringify(formData));
    window.location.href = "insured.html";
});


var travel_goal_opened = false;
var currency_opened = false;
var travel_goal_content = document.getElementById("travel_goal_content");
var currency_content = document.getElementById("currency_content");
var travel_goal = document.querySelector(".travel_goal");
var currency = document.querySelector(".currency");
var travel_goal_arrow_up = document.getElementById("arrow_down_travel");
var travel_goal_arrow_down = document.getElementById("arrow_up_travel");
var currency_arrow_up = document.getElementById("arrow_up_currency");
var currency_arrow_down = document.getElementById("arrow_down_currency");


travel_goal.addEventListener("click", function () {
    if (!travel_goal_opened) {
        travel_goal_content.style.display = "flex";
        travel_goal_opened = true;

        travel_goal_arrow_down.style.display = "block";
        travel_goal_arrow_up.style.display = "none";
    } else {
        travel_goal_content.style.display = "none";
        travel_goal_opened = false;


        travel_goal_arrow_up.style.display = "block";
        travel_goal_arrow_down.style.display = "none";
    }
});




currency.addEventListener("click", function () {
    if (!currency_opened) {
        currency_content.style.display = "flex";
        currency_opened = true;

        currency_arrow_down.style.display = "none";
        currency_arrow_up.style.display = "block";
    } else {
        currency_content.style.display = "none";
        currency_opened = false;


        currency_arrow_up.style.display = "none";
        currency_arrow_down.style.display = "block";
    }
});

var travel_goals = travel_goal_content.querySelectorAll("a");
var travel_goal_text = document.getElementById("travel_goal_text");
var currency_text = document.getElementById("currency_text");

travel_goals.forEach(function (travel_goal) {
    travel_goal.addEventListener("click", function (event) {
        event.preventDefault();

        localStorage.setItem("travelGoal", this.textContent);
        travel_goal_content.style.display = "none";
        travel_goal_opened = false;


        travel_goal_arrow_up.style.display = "block";
        travel_goal_arrow_down.style.display = "none";

        travel_goal_text.innerHTML = this.innerText;
    });
});

var currencies = currency_content.querySelectorAll("a");

currencies.forEach(function (currency) {
    currency.addEventListener("click", function (event) {
        event.preventDefault();

        localStorage.setItem("currency", this.textContent);

        currency_content.style.display = "none";
        currency_opened = false;


        currency_arrow_up.style.display = "none";
        currency_arrow_down.style.display = "block";

        currency_text.innerHTML = this.innerText;
    });
});


// Получаем все радиокнопки с именем summ_group
const radios = document.querySelectorAll('input[name="summ_group"]');

// Функция для определения выбранной радиокнопки
function getSelectedRadioValue() {
    let selectedValue = null;
    radios.forEach((radio) => {
        if (radio.checked) {
            selectedValue = radio.nextElementSibling.nextElementSibling.textContent; // Получаем значение из соседнего label
        }
    });
    return selectedValue;
}

// Пример использования
document.addEventListener('change', (event) => {
    if (event.target.name === 'summ_group') {
        const selectedValue = getSelectedRadioValue();
        localStorage.setItem("chosen_price", selectedValue);
        console.log('Выбрано:', selectedValue);
    }
});
