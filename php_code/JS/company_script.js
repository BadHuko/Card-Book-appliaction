// Открытие и закрытие модального окна
var modal = document.getElementById("editModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Функция для добавления новой карточки
function addCard() {
    if (!isUserLoggedIn()) {
        showNotification("Пожалуйста, войдите в систему, чтобы сохранить данные.");
        return;
    }


    var cardsContainer = document.querySelector('.cards-container');
  
    var cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
  
    // Создаем элементы карточки и получаем их значения
    var companyName = document.createElement('input');
    companyName.type = 'text';
    companyName.placeholder = 'Имя компании';
  
    var companyAddress = document.createElement('input');
    companyAddress.type = 'text';
    companyAddress.placeholder = 'Адрес';
  
    var companyPhone = document.createElement('input');
    companyPhone.type = 'text';
    companyPhone.placeholder = 'Телефон';



    companyPhone.addEventListener('input', function() {
        var phoneValue = companyPhone.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
        if (phoneValue.length > 13) phoneValue = phoneValue.slice(0, 13); // Ограничиваем длину до 13 цифр
  
        var formattedPhone = formatPhoneNumber(phoneValue);
        companyPhone.value = formattedPhone;
    });

    var companyInn = document.createElement('input'); // Добавлено
    companyInn.type = 'text'; // Добавлено
    companyInn.placeholder = 'ИНН'; // Добавлено

    var companyWebsite = document.createElement('input'); // Добавлено
    companyWebsite.type = 'text'; // Добавлено
    companyWebsite.placeholder = 'Веб-сайт'; // Добавлено

  
    var companyEmail = document.createElement('input');
    companyEmail.type = 'text';
    companyEmail.placeholder = 'Почта';
  
    var companyNote = document.createElement('textarea');
    companyNote.placeholder = 'Примечание';
    companyNote.classList.add('note');
  
    var buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('card-buttons');
  
    // Создаем кнопки "Сохранить" и "Отмена"
    var saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fas fa-check"></i>';
    saveButton.onclick = function() {
        // Проверяем, заполнены ли все поля
        if (companyName.value && (companyAddress.value || companyPhone.value || companyEmail.value)) {
            // Проверка на существование компании с таким именем
            checkCompanyName(companyInn.value, function(exists) {
                if (!exists) {
                    // Если компания с таким именем не существует, сохраняем новую компанию
                    saveCard(companyName.value, companyAddress.value, companyPhone.value, companyInn.value, companyWebsite.value, companyEmail.value, companyNote.value);
                    displayCard(companyName.value, companyAddress.value, companyPhone.value, companyInn.value, companyWebsite.value, companyEmail.value, companyNote.value, cardContainer);
                } else {
                    // Если компания с таким именем уже существует, выводим сообщение об ошибке
                    showNotification('Компания с таким инн уже существует');
                }
            });
        } else {
            showNotification('Пожалуйста, заполните все поля.');
        }
    };
  
    var deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.onclick = function() {
        cardsContainer.removeChild(cardContainer);
    };
  
    // Добавляем все элементы карточки на страницу
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(saveButton);
  
    cardContainer.appendChild(companyName);
    cardContainer.appendChild(companyAddress);
    cardContainer.appendChild(companyPhone);
    cardContainer.appendChild(companyInn); // Добавлено
    cardContainer.appendChild(companyWebsite); // Добавлено
    cardContainer.appendChild(companyEmail);
    cardContainer.appendChild(companyNote);
    cardContainer.appendChild(buttonsContainer);
  
    // Получение карточки "+"
    var plusCard = document.querySelector('.plus-card');
  
    // Добавление новой карточки после карточки "+"
    cardsContainer.insertBefore(cardContainer, plusCard.nextSibling);
}

    //форматирует телефон в +х(ххх) ххх-хх-хх
    function formatPhoneNumber(phone) {
        if (phone.length <= 11 && phone.startsWith('8')) {
            phone = '7' + phone.slice(1);
        }
        if (phone.length <= 11) {
            if (phone.length <= 11 && phone.startsWith('8')) {
                phone = '7' + phone.slice(1);
            }
            return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
        } else if (phone.length === 12) {
            return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
        } else if (phone.length === 13) {
            return phone.replace(/(\d{3})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
        }
        return phone;
    }



// Функция для отображения карточки компании
function displayCard(companyName, companyAddress, companyPhone, companyInn, companyWebsite, companyEmail, companyNote, cardContainer) {
    // Очищаем содержимое контейнера карточки
    cardContainer.innerHTML = '';
  
    // Создаем элементы для отображения информации
    var nameElement = document.createElement('h3');
    nameElement.textContent = companyName;
    nameElement.style.fontWeight = 'bold';
    nameElement.style.fontSize = '1.5em'; // Увеличиваем размер заголовка
  
    var addressElement = document.createElement('p');
    addressElement.textContent = companyAddress;
  
    var phoneElement = document.createElement('p');
    phoneElement.textContent = companyPhone;

    var innElement = document.createElement('p');
    innElement.textContent = companyInn;

    var websiteElement = document.createElement('p');
    websiteElement.textContent = companyWebsite;
  
    var emailElement = document.createElement('p');
    emailElement.textContent = companyEmail;
  
    var noteElement = document.createElement('p');
    noteElement.textContent = companyNote;
    noteElement.style.marginTop = '10px';
  
    // Добавляем элементы в контейнер карточки
    cardContainer.appendChild(nameElement);
    cardContainer.appendChild(addressElement);
    cardContainer.appendChild(phoneElement);
    cardContainer.appendChild(innElement);
    cardContainer.appendChild(websiteElement);
    cardContainer.appendChild(emailElement);
    cardContainer.appendChild(noteElement);
  
    // Добавляем кнопки "Редактировать" и "Удалить"
    var buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('card-buttons');
    buttonsContainer.style.marginTop = 'auto'; // Автоматически отодвигает кнопки вниз
  
    var editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.classList.add('edit-button'); // Добавляем класс для обработки события
    editButton.onclick = function() {
        editCard(companyName, companyAddress, companyPhone, companyInn, companyWebsite, companyEmail, companyNote, cardContainer);
    }
  
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = function() {
        cardContainer.parentNode.removeChild(cardContainer);
    };
  
    buttonsContainer.appendChild(editButton);
    buttonsContainer.appendChild(deleteButton);
    cardContainer.appendChild(buttonsContainer);
}

// Функция для сохранения карточки компании
function saveCard(companyName, companyAddress, companyPhone, companyInn, companyWebsite, companyEmail, companyNote) {
    if (!isUserLoggedIn()) {
        showNotification("Пожалуйста, войдите в систему, чтобы сохранить данные.");
        return;
    }


    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../executable_files/Save/save_card.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            showNotification(xhr.responseText);
        }
    };
    xhr.send("companyName=" + encodeURIComponent(companyName) +
             "&companyAddress=" + encodeURIComponent(companyAddress) +
             "&companyPhone=" + encodeURIComponent(companyPhone) +
             "&companyInn=" + encodeURIComponent(companyInn) +
             "&companyWebsite=" + encodeURIComponent(companyWebsite) +
             "&companyEmail=" + encodeURIComponent(companyEmail) +
             "&companyNote=" + encodeURIComponent(companyNote));
}

// Функция для проверки существования компании по имени
function checkCompanyName(companyInn, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../executable_files/Save/check_company.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var exists = xhr.responseText === "true" ? true : false;
            callback(exists);
        }
    };
    xhr.send("companyInn=" + encodeURIComponent(companyInn));
}


// Обработка нажатия кнопки редактирования
document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', function() {
        var cardContainer = this.closest('.card');
        var companyName = cardContainer.querySelector('h3').textContent;
        var companyAddress = cardContainer.querySelectorAll('p')[0].textContent;
        var companyPhone = cardContainer.querySelectorAll('p')[1].textContent;
        var companyInn = cardContainer.querySelectorAll('p')[2].textContent; 
        var companyWebsite = cardContainer.querySelectorAll('p')[3].textContent;
        var companyEmail = cardContainer.querySelectorAll('p')[4].textContent;
        var companyNote = cardContainer.querySelectorAll('p')[5].textContent; 
        editCard(companyName, companyAddress, companyPhone, companyInn, companyWebsite, companyEmail, companyNote, cardContainer); 
    });
});


// Функция для редактирования карточки компании
function editCard(companyName, companyAddress, companyPhone, companyInn, companyWebsite, companyEmail, companyNote, cardContainer) {
    // Заполняем поля формы редактирования данными о компании
    document.getElementById('editCompanyName').value = companyName;
    document.getElementById('editNewCompanyName').value = companyName;
    document.getElementById('editCompanyAddress').value = companyAddress;
    document.getElementById('editCompanyPhone').value = companyPhone;
    document.getElementById('editCompanyInn').value = companyInn;
    document.getElementById('editCompanyWebsite').value = companyWebsite;
    document.getElementById('editCompanyEmail').value = companyEmail;
    document.getElementById('editCompanyNote').value = companyNote;
  
    // Открываем модальное окно
    modal.style.display = 'block';
  

    // Добавляем обработчик для ввода телефона
    var editCompanyPhone = document.getElementById('editCompanyPhone');
    editCompanyPhone.addEventListener('input', function() {
        var phoneValue = editCompanyPhone.value.replace(/\D/g, ''); // Удаляем все нецифровые символы
        if (phoneValue.length > 13) phoneValue = phoneValue.slice(0, 13); // Ограничиваем длину до 13 цифр
  
        var formattedPhone = formatPhoneNumber(phoneValue);
        editCompanyPhone.value = formattedPhone;
    });


    // Сохраняем изменения при нажатии кнопки "Сохранить"
    document.getElementById('saveEdit').onclick = function() {
        var newCompanyName = document.getElementById('editNewCompanyName').value;
        var newCompanyAddress = document.getElementById('editCompanyAddress').value;        
        var newCompanyPhone = document.getElementById('editCompanyPhone').value;
        var newCompanyInn = document.getElementById('editCompanyInn').value;
        var newCompanyWebsite = document.getElementById('editCompanyWebsite').value;
        var newCompanyEmail = document.getElementById('editCompanyEmail').value;
        var newCompanyNote = document.getElementById('editCompanyNote').value;
  
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "../executable_files/Save/update_company.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                showNotification(xhr.responseText);
                if (xhr.responseText === "Данные компании успешно обновлены") {
                    displayCard(newCompanyName, newCompanyAddress, newCompanyPhone, newCompanyInn, newCompanyWebsite, newCompanyEmail, newCompanyNote, cardContainer);
                    modal.style.display = "none";
                }
            }
        };
        xhr.send("companyName=" + encodeURIComponent(companyName) +
                 "&newCompanyName=" + encodeURIComponent(newCompanyName) +
                 "&newCompanyAddress=" + encodeURIComponent(newCompanyAddress) +
                 "&newCompanyPhone=" + encodeURIComponent(newCompanyPhone) +
                 "&newCompanyInn=" + encodeURIComponent(newCompanyInn) +
                 "&newCompanyWebsite=" + encodeURIComponent(newCompanyWebsite) +
                 "&newCompanyEmail=" + encodeURIComponent(newCompanyEmail) +
                 "&newCompanyNote=" + encodeURIComponent(newCompanyNote));
    };

    document.getElementById('deleteCompanyModal').onclick = function() {
        console.log('companyInn:', companyInn); // Добавлено для отладки
        if (confirm('Вы уверены, что хотите удалить компанию с таким "' + companyName + '"?')) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "../executable_files/Delete/delete_company.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        showNotification(xhr.responseText);
                        if (xhr.responseText.includes("Компания успешно удалена")) {
                            showNotification('Запись успешно удалена');
                            cardContainer.remove();
                            setTimeout(() => location.reload(), 3000); // Перезагружаем страницу после уведомления
                        }
                    }
                }
            };
            xhr.send("companyInn=" + encodeURIComponent(companyInn));
        }
    };





}








// Обработка события ввода в поле поиска
const searchInput = document.getElementById('searchInput');
const plusCard = document.querySelector('.plus-card');
const cards = document.querySelectorAll('.card');

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
  
    cards.forEach(card => {
        const companyNameElement = card.querySelector('h3');
        if (companyNameElement) {
            const companyName = companyNameElement.textContent.toLowerCase();
            if (companyName.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        }
    });
  
    plusCard.style.display = 'block';
});




// Проверка, авторизован ли пользователь
function isUserLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../executable_files/auntitification/check_auth.php", false);
    xhr.send(null);
    return xhr.responseText === "authorized";
}

// Добавляем обработчики для кнопок входа и регистрации
document.getElementById('loginSubmit').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../executable_files/auntitification/auth.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            showNotification(xhr.responseText);
            if (xhr.responseText === "Авторизация успешна") {
              loginModal.style.display = 'none';
            }
          }
    };
    xhr.send("action=login&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
});


document.getElementById('registerSubmit').addEventListener('click', function() {
    var username = document.getElementById('registerUsername').value;
    var password = document.getElementById('registerPassword').value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../executable_files/auntitification/auth.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            showNotification(xhr.responseText);
        }
    };
    xhr.send("action=register&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
});



// Обработчики открытия и закрытия модального окна
var loginModal = document.getElementById('loginModal');
var loginButton = document.getElementById('loginButton');
var closeLoginModal = document.getElementsByClassName('close')[0];

loginButton.onclick = function() {
    loginModal.style.display = 'block';
}

closeLoginModal.onclick = function() {
    loginModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }