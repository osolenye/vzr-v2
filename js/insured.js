document.addEventListener("DOMContentLoaded", function () {
    // const url = 'https://api.insurance.kg/crm_test/api_business/calculate_price/';  // Замените URL на необходимый
    // const data = {
    //     key1: 'value1',
    //     key2: 'value2'
    // };  // Данные, которые вы хотите отправить

    // fetch(url, {
    //     method: 'POST',  // Указываем метод POST
    //     headers: {
    //         'Content-Type': 'application/json'  // Устанавливаем заголовок для отправки JSON
    //     },
    //     body: JSON.stringify(data)  // Преобразуем объект data в строку JSON
    // })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok ' + response.statusText);
    //         }
    //         return response.json();  // Преобразуем ответ в формат JSON
    //     })
    //     .then(data => {
    //         console.log('Success:', data);  // Обрабатываем успешный ответ
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);  // Обрабатываем ошибки
    //     });





    // URL, к которому будет выполняться GET-запрос
    const url = 'https://api.insurance.kg/crm_test/api_business/additional_info_list/';

    // Выполнение GET-запроса с помощью fetch
    fetch(url)
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

                    localStorage.setItem("additional_info_type", this.className);
                    localStorage.setItem("additional_info_id", this.id);
                    console.log('Выбрано:', this.innerText);
                    console.log('Выбрано:', this.className);

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