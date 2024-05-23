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



                    // // URL, к которому будет отправлен GET-запрос
                    // const url_get_summs = 'https://api.insurance.kg/travel_agency/api/get_insurance_summ/?country=' + chosen_country_id;

                    // // Выполнение GET-запроса с использованием fetch и добавлением заголовков
                    // fetch(url_get_summs, {
                    //     method: 'GET',
                    //     headers: {
                    //         'Content-Type': 'application/json', // пример заголовка
                    //         'Authorization': 'Bearer ' + localStorage.getItem("accessToken") // пример заголовка с токеном авторизации
                    //         // Здесь вы можете добавить другие необходимые заголовки
                    //     }
                    // })
                    //     .then(response => {
                    //         // Проверка статуса ответа
                    //         if (!response.ok) {
                    //             console.log(response.json);
                    //             throw new Error('Network response was not ok');
                    //         }
                    //         // Возвращаем данные в формате JSON
                    //         return response.json();
                    //     })
                    //     .then(data => {
                    //         // Обработка полученных данных
                    //         var fieldset = document.querySelector("fieldset");

                    //         // Удаляем все текущие элементы label_summ
                    //         while (fieldset.firstChild) {
                    //             fieldset.removeChild(fieldset.firstChild);
                    //         }


                    //         data.forEach(function (summ) {

                    //             // Создаем элементы
                    //             const label = document.createElement('label');
                    //             label.classList.add('label_summ');

                    //             const divCheckboxWrapper = document.createElement('div');
                    //             divCheckboxWrapper.classList.add('checkbox_wrapper');

                    //             const input = document.createElement('input');
                    //             input.type = 'radio';
                    //             input.classList.add('input_summ');
                    //             input.name = 'summ_group';

                    //             const spanCustomCheckbox = document.createElement('span');
                    //             spanCustomCheckbox.classList.add('custom_checkbox');

                    //             const innerLabel = document.createElement('label');
                    //             innerLabel.classList.add('summ');
                    //             innerLabel.textContent = summ.insurance_summ;
                    //             innerLabel.id = summ.id;
                    //             localStorage.setItem("chosen_price_id", summ.id);

                    //             // Собираем элементы вместе
                    //             divCheckboxWrapper.appendChild(input);
                    //             divCheckboxWrapper.appendChild(spanCustomCheckbox);
                    //             divCheckboxWrapper.appendChild(innerLabel);

                    //             label.appendChild(divCheckboxWrapper);

                    //             // Добавляем созданный элемент в DOM
                    //             fieldset.appendChild(label);
                    //         });
                    //     })
                    //     .catch(error => {
                    //         // Обработка ошибок
                    //         console.error('There was a problem with the fetch operation:', error);
                    //     });
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
    const url1 = 'https://api.insurance.kg/crm_test/api_business/additional_info_list/';

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
            var additional_info_content = document.getElementById("additional_info_content");
            data.forEach(function (country) {
                // Создание элемента <a>
                const link = document.createElement('a');

                // Установка текста ссылки
                link.textContent = country.name;
                link.classList = "rates";
                link.id = country.id;
                // Установка атрибута href
                link.href = '';
                // Добавление ссылки в DOM
                additional_info_content.appendChild(link);
            })


            const link = document.createElement('a');

            // Установка текста ссылки
            link.textContent = data[0].category.name;
            link.classList = "additional";
            link.id = data[0].category.id;
            // Установка атрибута href
            link.href = '';
            // Добавление ссылки в DOM
            additional_info_content.appendChild(link);





            var additinal_info_opened = false;
            var additional_info_content = document.getElementById("additional_info_content");
            var additional_info = document.querySelector(".additional_info_wrapper");
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

                    localStorage.setItem("additional_info_type", this.classList.toString());
                    localStorage.setItem("additional_info_id", this.id);

                    // additional_info_content.style.display = "none";
                    // additinal_info_opened = false;


                    // additional_info_arrow_up.style.display = "none";
                    // additional_info_arrow_down.style.display = "block";

                    additional_info_text.innerHTML = this.innerText;
                });
            });

        })
        .catch(error => {
            // Обработка ошибок
            console.error('There has been a problem with your fetch operation:', error);
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

        var additional_info_type = localStorage.getItem("additional_info_type");
        var additional_info_id = localStorage.getItem("additional_info_id");
        if (additional_info_type === "rates") {
            calculate_price_request[0].rates = [additional_info_id];
        } else {
            calculate_price_request[0].additional_info = [additional_info_id];
        }

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