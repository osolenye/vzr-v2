document.addEventListener("DOMContentLoaded", function () {
    var countries = document.querySelector(".countries");
    // URL, к которому будет отправлен GET-запрос
    const url = "https://api.insurance.kg/crm_test/api_business/territories/";
    // const url = "http://212.112.103.137:88/api_business/territories/"

    // Выполнение GET-запроса с использованием fetch и добавлением заголовков
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // пример заголовка
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
                    localStorage.setItem("chosen_country_name", country_option.innerHTML);
                    countries.style.display = "none";
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
        }
    });









    // URL, к которому будет выполняться GET-запрос
    // const url1 = 'https://api.insurance.kg/crm_test/api_business/additional_info_list/';
    const url1 = 'https://api.insurance.kg/crm_test/api_business/rates/';

    // Выполнение GET-запроса с помощью fetch
    fetch(url1)
        .then(response => {
            // Проверка, успешен ли ответ
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Преобразование ответа в JSON
            return response.json();
        })
        .then(data => {
            // Обработка полученных данных
            console.log(data);
            var additional_info_content = document.getElementById("additional_info_content");
            var fieldset_rates = document.querySelector(".fieldset_rates");
            data.forEach(function (country) {
                // Create elements
                var div = document.createElement("div");
                div.className = "checkbox_wrapper";

                var input = document.createElement("input");
                input.type = "checkbox";
                input.className = "input_rates";
                input.name = "rates_group";

                var span = document.createElement("span");
                span.className = "custom_checkbox";

                var label = document.createElement("label");
                label.className = "label_rates";
                label.id = country.id;
                label.textContent = country.condition;

                // Append elements to div
                div.appendChild(input);
                div.appendChild(span);
                div.appendChild(label);

                // Append div to the parent container
                fieldset_rates.appendChild(div);
            })

            var additinal_info_opened = false;
            var additional_info_content = document.getElementById("additional_info_content");
            var additional_info = document.querySelector(".additional_info");
            var additional_info_arrow_up = document.getElementById("arrow_up_additional_info");
            var additional_info_arrow_down = document.getElementById("arrow_down_additional_info");

            additional_info.addEventListener("click", function () {
                if (!additinal_info_opened) {
                    additional_info_content.style.display = "flex";
                    additinal_info_opened = true;

                    additional_info_arrow_down.style.display = "none";
                    additional_info_arrow_up.style.display = "block";
                } else {
                    additional_info_content.style.display = "none";
                    additinal_info_opened = false;


                    additional_info_arrow_up.style.display = "none";
                    additional_info_arrow_down.style.display = "block";
                }
            });

            var additional_info_content = document.getElementById("additional_info_content");
            var additional_infos = additional_info_content.querySelectorAll("a");
            var additional_info_text = document.querySelector("#additional_info_text");

            additional_infos.forEach(function (currency) {
                currency.addEventListener("click", function (event) {
                    event.preventDefault();

                    localStorage.setItem("additional_info_type", this.className);
                    localStorage.setItem("additional_info_id", this.id);
                    console.log('Выбрано:', this.innerText);
                    console.log('Выбрано:', this.className);

                    // additional_info_content.style.display = "none";
                    // additinal_info_opened = false;


                    // additional_info_arrow_up.style.display = "none";
                    // additional_info_arrow_down.style.display = "block";

                });
            });







            var additional_checkboxes_infos = additional_info_content_checkboxes.querySelectorAll("a");
            var additional_info_text = document.querySelector("#additional_info_checkboxes_text");

        })
        .catch(error => {
            // Обработка ошибок
            console.error('There has been a problem with your fetch operation:', error);
        });






    // URL, к которому будет выполнен запрос
    const url_additional_info = 'https://api.insurance.kg/crm_test/api_business/additional_info_list/';

    // Выполнение GET-запроса
    fetch(url_additional_info)
        .then(response => {
            // Проверка на успешный ответ
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Преобразование ответа в JSON
            return response.json();
        })
        .then(data => {
            // Работа с полученными данными
            console.log(data);
            var additional_info_content_checkboxes = document.getElementById("additional_info_content_checkboxes");
            var fieldset_additional_info = document.querySelector(".fieldset_additional_info");
            data.forEach(function (category) {

                // Create elements
                var div = document.createElement("div");
                div.className = "checkbox_wrapper";

                var input = document.createElement("input");
                input.type = "checkbox";
                input.className = "input_rates";
                input.name = "additional_info_group";

                var span = document.createElement("span");
                span.className = "custom_checkbox";

                var label = document.createElement("label");
                label.className = "label_additional_info";
                label.id = category.id;
                label.textContent = category.name;

                // Append elements to div
                div.appendChild(input);
                div.appendChild(span);
                div.appendChild(label);
                fieldset_additional_info.appendChild(div);

            });




            // var additinal_info_opened = false;
            // var additional_info_content = document.getElementById("additional_info_content");
            // // var additional_info = document.querySelector(".additional_info_wrapper");
            // var additional_info = document.querySelector(".additional_info");
            // var additional_info_arrow_up = document.getElementById("arrow_up_additional_info");
            // var additional_info_arrow_down = document.getElementById("arrow_down_additional_info");

            // additional_info.addEventListener("click", function () {
            //     if (!additinal_info_opened) {
            //         additional_info_content.style.display = "flex";
            //         additinal_info_opened = true;

            //         additional_info_arrow_down.style.display = "none";
            //         additional_info_arrow_up.style.display = "block";
            //     } else {
            //         additional_info_content.style.display = "none";
            //         additinal_info_opened = false;


            //         additional_info_arrow_up.style.display = "none";
            //         additional_info_arrow_down.style.display = "block";
            //     }
            // });


            // var additinal_info_checkboxes_opened = false;
            // var additional_info_content_checkboxes = document.getElementById("additional_info_content_checkboxes");
            // var additional_info_checkboxes_wrapper = document.querySelector(".additional_info_checkboxes");
            // var additional_info_arrow_up_checkboxes = document.getElementById("arrow_up_additional_info_checkboxes");
            // var additional_info_arrow_down_checkboxes = document.getElementById("arrow_down_additional_info_checkboxes");
            // var additional_info_content_checkboxes = document.getElementById("additional_info_content_checkboxes");

            // additional_info_checkboxes_wrapper.addEventListener("click", function (event) {
            //     event.preventDefault();


            //     if (!additinal_info_checkboxes_opened) {
            //         additional_info_content_checkboxes.style.display = "flex";
            //         additinal_info_checkboxes_opened = true;

            //         additional_info_arrow_down_checkboxes.style.display = "none";
            //         additional_info_arrow_up_checkboxes.style.display = "block";
            //     } else {
            //         additional_info_content_checkboxes.style.display = "none";
            //         additinal_info_checkboxes_opened = false;


            //         additional_info_arrow_up_checkboxes.style.display = "none";
            //         additional_info_arrow_down_checkboxes.style.display = "block";
            //     }
            // });

        })
        .catch(error => {
            // Обработка ошибок
            console.error('There was a problem with the fetch operation:', error);
        });


    var insured_add_wrapper = document.querySelector(".insured_add_wrapper");
    var insured_info = document.querySelector(".insured_info");
    insured_info.addEventListener("submit", function (event) {
        event.preventDefault();


        const data = {
            surname: document.getElementById('surname').value,
            name: document.getElementById('name').value,
            patronymic: document.getElementById('patronymic').value,
            inn: document.getElementById('inn').value,
            passportNumbers: document.getElementById('passport_numbers').value,
            passportDate: document.getElementById('passport_date').value,
            passportExpire: document.getElementById('passport_expire').value,
            additionalInfo: document.getElementById('additional_info_text').innerText,
            email: document.getElementById('email').value
        };


        var inn = data.inn;

        // Предположим, INN имеет формат YYMMDD..., тогда
        const year = inn.substr(5, 4);
        const month = inn.substr(3, 2);
        const day = inn.substr(1, 2);

        var calculate_price_request = [{
            territory: localStorage.getItem("chosen_country_id"),
            start_date: document.getElementById("date_begin").value,
            end_date: document.getElementById("date_end").value,
            policy_holder_birth_date: year + "-" + month + "-" + day,
            sum_insured: localStorage.getItem("chosen_price"),
            currency_letter_code: localStorage.getItem("currency").replace(/\s+/g, ''),
        }]

        var date_begin = document.getElementById("date_begin");
        var date_end = document.getElementById("date_end");

        var date_begin_formed = new Date(date_begin.value);
        var date_end_formed = new Date(date_end.value);
        console.log(date_begin_formed);
        console.log(date_end_formed);
        var policy_date_error = document.getElementById("policy_date_error");
        if (date_begin_formed > date_end_formed) {
            alert("Начальная дата не может быть больше конечной");
            policy_date_error.style.display = "block";
            window.location.href = "test.html#policy_date_error";
            return;
        } else if(date_end_formed - date_begin_formed > 365) {
            alert("Максимальный период действия полиса - 365 дня");
            policy_date_error.style.display = "block";
            window.location.href = "test.html#policy_date_error";
            return;
        } else {
            policy_date_error.style.display = "none";
        }
        localStorage.setItem("date_begin", date_begin.value);
        localStorage.setItem("date_end", date_end.value);



        var inputs = document.querySelectorAll('.fieldset_rates .input_rates');
        var rates_array = [];

        inputs.forEach(function (input) {
            if (input.checked) {
                var label = input.nextElementSibling.nextElementSibling;
                var value = label.id;
                rates_array.push(value);
            }
        });


        var additional_inputs = document.querySelectorAll('.fieldset_additional_info .input_rates');
        var additional_info_array = [];

        additional_inputs.forEach(function (input) {
            if (input.checked) {
                var label = input.nextElementSibling.nextElementSibling;
                var value = label.id;
                additional_info_array.push(value);
            }
        });


        calculate_price_request[0].rates = rates_array;
        calculate_price_request[0].additional_info = additional_info_array;


        console.log(JSON.stringify(calculate_price_request));
        const urlCalculatePrice = 'http://212.112.103.137:88/api_business/calculate_price/';

        // Настройки запроса
        const options = {
            method: 'POST', // Метод запроса
            headers: {
                'Content-Type': 'application/json' // Заголовки
            },
            body: JSON.stringify(calculate_price_request) // Преобразование объекта данных в JSON-строку
        };

        // Выполнение запроса
        fetch(urlCalculatePrice, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json(); // Преобразование ответа в JSON
            })
            .then(data => {
                console.log('Success:', data); // Обработка данных ответа
                var span_1 = document.getElementById('span_1');
                var span_2 = document.getElementById('span_2');
                var span_3 = document.getElementById('span_3');
                var span_4 = document.getElementById('span_4');


                span_1.innerText = "Cтоимость полиса составит " + data.insurance_premium + localStorage.getItem("currency");
                span_2.innerText = "Период действия полиса с " + localStorage.getItem("date_begin") + " по " + localStorage.getItem("date_end");
                span_3.innerText = "Страна поездки: " + localStorage.getItem("chosen_country_name");
                span_4.innerText = "Страховая сумма: " + localStorage.getItem("chosen_price");

            })
            .catch(error => {
                console.error('Error:', error); // Обработка ошибок
            });



        // Создаем элемент div
        var div = document.createElement('div');
        div.className = 'insured_added';

        // Создаем первый блок с классом "vertical insured"
        var firstBlock = document.createElement('div');
        firstBlock.className = 'horizontal insured';

        // Создаем элементы внутри первого блока
        var surnameDiv = document.createElement('div');
        surnameDiv.className = 'insured_added_item';
        surnameDiv.textContent = data.surname; // Вставляем значение фамилии

        var nameDiv = document.createElement('div');
        nameDiv.className = 'insured_added_item';
        nameDiv.textContent = data.name; // Вставляем значение имени

        var emailDiv = document.createElement('div');
        emailDiv.className = 'insured_added_item';
        emailDiv.textContent = data.email; // Вставляем значение email

        // Добавляем созданные элементы в первый блок
        firstBlock.appendChild(surnameDiv);
        firstBlock.appendChild(nameDiv);
        firstBlock.appendChild(emailDiv);

        // Создаем второй блок с классом "vertical insured"
        var secondBlock = document.createElement('div');
        secondBlock.className = 'horizontal insured';

        // Создаем элементы внутри второго блока
        var innDiv = document.createElement('div');
        innDiv.className = 'insured_added_item inn';
        innDiv.textContent = data.inn; // Вставляем значение ИНН

        var passportDiv = document.createElement('div');
        passportDiv.className = 'insured_added_item passport';
        passportDiv.textContent = data.passportNumbers; // Вставляем значение серии и номера паспорта

        // Добавляем созданные элементы во второй блок
        secondBlock.appendChild(innDiv);
        secondBlock.appendChild(passportDiv);

        // Создаем кнопку удаления
        var deleteButton = document.createElement('button');
        deleteButton.className = 'button_delete';
        deleteButton.textContent = 'Удалить';

        // Добавляем оба блока и кнопку удаления в основной элемент div
        div.appendChild(firstBlock);
        div.appendChild(secondBlock);
        div.appendChild(deleteButton);

        insured_add_wrapper.appendChild(div);


        deleteButton.addEventListener("click", function () {
            this.parentNode.remove();
        });
    })
});