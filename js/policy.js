window.addEventListener("load", function () {
    // URL, к которому будет выполняться GET-запрос
    const url = 'https://api.insurance.kg/crm_test/api_business/check_policy/gAAAAABmUsFLpN5MWZVxyesjg-ZQ8HAqyY3sjUE9ZHq88yxDW2GsxTkpd-QqT8JaR6MNPS__SevB985cMb4DBWbh9yCYHF4spA==/';

    // Выполнение GET-запроса
    fetch(url)
        .then(response => {
            // Проверка, успешно ли выполнен запрос
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Преобразование ответа в JSON
            return response.json();
        })
        .then(data => {
            // Обработка данных из ответа
            console.log(data);
            var policy_number = document.querySelector('.policy_number');
            policy_number.innerHTML = policy_number.innerHTML + "" + data.id;
            var date_expiration = document.querySelector('.date_expiration');
            date_expiration.innerHTML = "Действителен с " + data.start_date + " по " + data.end_date;
            var policy_territory = document.querySelector('.policy_territory');
            policy_territory.innerHTML = "Территория страхования: " + data.territory.name;
            var policy_summ = document.querySelector('.policy_summ');
            policy_summ.innerHTML = "Страховая сумма: " + data.sum_insured + " " + data.currency_letter_code;
            var policy_trup_goal = document.querySelector('.policy_trip_goal');
            policy_trup_goal.innerHTML = "Цель поездки: " + data.purpose;
            var fio = document.querySelector('.fio');
            fio.innerHTML = "ФИО: " + data.customer.fullname;
        })
        .catch(error => {
            // Обработка ошибок
            console.error('There has been a problem with your fetch operation:', error);
            var block = document.querySelector('.block');
            block.style.display = "none";
            
            var error_block = document.querySelector('.block_error');
            error_block.style.display = "flex";
        });

});