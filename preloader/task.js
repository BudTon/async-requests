const xhr = new XMLHttpRequest()
const gif = document.getElementById('loader')
const item = document.getElementById('items')


xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {

        // Преобразование объекта JSON в объект JS
        const data = JSON.parse(xhr.responseText)["response"]["Valute"];
        printValues(data, item);

        // Рекурсивная функция для вывода вложенных значений
        function printValues(data, item) {
            for (let k in data) {
                item.insertAdjacentHTML('beforeEnd', `<div class="item">
                                                        <div class="item__code">
                                                        ${data[k]['CharCode']}
                                                        </div>
                                                        <div class="item__value">
                                                        ${data[k]['Value']}
                                                        </div>
                                                        <div class="item__currency">
                                                        руб.
                                                        </div>
                                                    </div>`)
            }
        };
        gif.classList.remove('loader_active')
    }
})

xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses')
xhr.send()