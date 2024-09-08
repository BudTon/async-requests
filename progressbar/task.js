const progressPostRemove = document.getElementById('progress')
const card = document.querySelector('.card')
const formPost = document.forms.form;
const urlPost = 'https://students.netoservices.ru/nestjs-backend/upload'

progressPostRemove.remove();

card.insertAdjacentHTML('afterBegin', '<div id="progress-box" style="display: flex; flex-direction: row;"></div>')

const progressBox = document.getElementById('progress-box')

progressBox.insertAdjacentHTML('beforeEnd', '<progress value="0.0" id="progress"></progress>')
progressBox.insertAdjacentHTML('beforeEnd', '<p id="percentages" style="margin-bottom: 10px; margin-top: -3px; margin-left: 10px;"></p>')

const progressPost = document.getElementById('progress')
const percentagesPost = document.getElementById('percentages')

formPost.addEventListener('submit', (e) => {
    e.preventDefault();

    const xhr = new XMLHttpRequest();

    xhr.onerror = () => {
        alert('Загрузка не удалась.');
        window.location.reload();
    };

    xhr.onabort = () => {
        alert('Загрузка отменена.');
        window.location.reload();
    };

    xhr.upload.addEventListener('progress', (e) => {
        let file1Size = document.forms.form.file.files[0].size;
        let percentages = (e.loaded / file1Size).toFixed(2) * 100;
        percentagesPost.textContent = `${percentages} %`
        progressPost.value = percentages / 100;
    });
    
    xhr.onprogress = () => {
        setTimeout(() => {
            alert('Загрузка завершена!');
            window.location.reload();
        }, 100);
    }

    let formdata = new FormData();
    formdata.append('file', document.forms.form.file.files[0]);

    xhr.open('post', urlPost);
    xhr.send(formdata);
});


