const xhr = new XMLHttpRequest();
const title = document.getElementById('poll__title');
const answers = document.getElementById('poll__answers');

xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE) {
        const data = JSON.parse(xhr.responseText);
        const answersList = data.data.answers;
        title.insertAdjacentHTML('beforeEnd', `${data.data.title}`);

        answersList.forEach(answer => {
            answers.insertAdjacentHTML('beforeEnd', `<button class="poll__answer" style="margin-right: 10px;"> ${answer} </button>`)
        });

        const buttonsList = document.querySelectorAll('button')
        buttonsList.forEach((button, index) => {
            button.addEventListener('click', () => {
                alert('Спасибо, ваш голос засчитан!')
                let answerId = index;
                const xhrPost = new XMLHttpRequest();
                xhrPost.addEventListener('readystatechange', () => {
                    if (xhrPost.readyState === xhr.DONE) {
                        const stat = JSON.parse(xhrPost.responseText)["stat"];
                        answers.style = 'display: none;';
                        let summ = 0;
                        stat.find(statAnswer => { summ += statAnswer.votes });
                        stat.forEach(answer => {
                            title.insertAdjacentHTML('beforeEnd', `<p class="stat_answer">${answer.answer}: ${(answer.votes / summ * 100).toFixed(2)}%</p>`)
                        });
                    };
                });
                const sendPost = `vote=${data.id}&answer=${answerId}`;
                xhrPost.open('POST', 'https://students.netoservices.ru/nestjs-backend/poll');
                xhrPost.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhrPost.send(sendPost);
            });
        });
    };
});

xhr.open('GET', ' https://students.netoservices.ru/nestjs-backend/poll');
xhr.send();