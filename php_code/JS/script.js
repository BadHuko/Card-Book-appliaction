document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const searchBy = document.getElementById('searchBy');
  const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
  const addButton = document.getElementById('addButton');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementsByClassName('close')[0];
  const contactForm = document.getElementById('contactForm');
  const cancelButton = document.getElementById('cancelButton');
  const saveButton = document.getElementById('saveButton');


  addButton.onclick = function() {
    if (!isUserLoggedIn()) {
      showNotification("Пожалуйста, войдите в систему, чтобы сохранять данные.");
      return;
    }
    clearModalFields(); // Очищаем поля ввода в модальном окне
    modal.style.display = 'block';
  }

  closeModal.onclick = function() {
    modal.style.display = 'none';
  }

  cancelButton.onclick = function() {
    modal.style.display = 'none';
  }

  searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();

    for (const row of table.rows) {
      const cells = row.cells;
      let match = false;

      for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerText.toLowerCase().includes(searchTerm)) {
          match = true;
          break;
        }
      }

      row.style.display = match ? '' : 'none';
    }
  });




  // Проверка формата имени
  function isValidName(name) {
    // Разделение строки имени по пробелам
    const nameParts = name.split(' ');
    // Проверка, что введено три слова
    return nameParts.length === 3;
  }

  function clearModalFields() {
    document.querySelectorAll('#editModal input, #editModal textarea').forEach(field => {
        field.value = '';
    });
}

  saveButton.addEventListener("click", async function() {
    const companyInput = document.getElementById("companyInput").value;
    const city = document.getElementById("city").value;
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const email = document.getElementById("email").value;
    const note = document.getElementById("note").value;
    const phoneInput = document.getElementById("phone");
    const formattedPhoneNumber = formatPhoneNumber(phoneInput.value);
    const addnum = document.getElementById("addnum").value;
    const personalPhoneInput = document.getElementById("personalPhone");
    const formattedPersonalPhoneNumber = formatPhoneNumber(personalPhoneInput.value);
    // Проверка, что компания в списке
    if (!companyExist) {
      showNotification('Компания не найдена. Пожалуйста, выберите компанию из списка или создайте ее  .');
      return;
    }
    if (!isValidName(name)) {
      showNotification('Пожалуйста, введите Фамилию Имя Отчество.');Я
      return;
    }


    const formData = new FormData();
    formData.append('company', companyInput);
    formData.append('city', city);
    formData.append('name', name);
    formData.append('position', position);
    formData.append('phone', formattedPhoneNumber); // Здесь добавляем отформатированный номер телефона
    formData.append('personalPhone', formattedPersonalPhoneNumber);
    formData.append('addnum', addnum);
    formData.append('email', email);
    formData.append('note', note);
    try {
        const response = await fetch('../executable_files/Save/save_data.php', {
            method: 'POST',
            body: formData
        });
        const result = await response.text();
        modal.style.display = 'none'; // Закрываем модальное окно
        showNotification(result); // Показываем уведомление
        setTimeout(() => location.reload(), 600); // Перезагружаем страницу после уведомления
    } catch (error) {
        console.error('Ошибка:', error);
    }
  });
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  // Маска для поля имени
  const nameInput = document.getElementById('name');
  nameInput.addEventListener('input', function() {
    const regex = /^[а-яА-ЯёЁa-zA-Z]+\s[а-яА-ЯёЁa-zA-Z]+\s[а-яА-ЯёЁa-zA-Z]+$/;
    if (!regex.test(nameInput.value)) {
      nameInput.setCustomValidity('Пожалуйста, введите Фамилию Имя Отчество');
    } else {
      nameInput.setCustomValidity('');
    }
  });

  const phoneInput = document.getElementById('phone');
  function formatPhoneNumber(phone) {
    phone = phone.replace(/\D/g, ''); // Удаляем все нечисловые символы
    if (phone.length <= 11 && phone.startsWith('8')) {
        phone = '7' + phone.slice(1);
    }
    if (phone.length <= 11) {
        return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    } else if (phone.length === 12) {
        return phone.replace(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    } else if (phone.length === 13) {
        return phone.replace(/(\d{3})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    }
    return phone;
  }
  phoneInput.addEventListener('input', function() {
    phoneInput.value = formatPhoneNumber(phoneInput.value);
  });
  // Маска для ввода личного телефонного номера
  const personalPhoneInput = document.getElementById('personalPhone');
  personalPhoneInput.addEventListener('input', function() {
    personalPhoneInput.value = formatPhoneNumber(personalPhoneInput.value);
  });
  //Авторизация
  // Проверка, авторизован ли пользователь
  function isUserLoggedIn() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../executable_files/auntitification/check_auth.php", false);
  xhr.send(null);
  return xhr.responseText === "authorized";
}
});









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
// Обработчики открытия и закрытия модального окна
var loginModal = document.getElementById('loginModal');
var loginButton = document.getElementById('loginButton');
var closeLoginModal = document.getElementsByClassName('close2')[0];
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



//Работа с выводом данных и таблицкй
document.addEventListener('DOMContentLoaded', function() {
  // Получаем таблицу и ее тело
  const table = document.getElementById('dataTable');
  const tableBody = table.getElementsByTagName('tbody')[0];
  // Добавляем обработчик клика на таблицу
  tableBody.addEventListener('click', function(event) {
    if (!isUserLoggedIn()) {
      showNotification("Пожалуйста, войдите в систему, чтобы просматривать данные.");
      return;
    }
    const clickedRow = event.target.closest('tr'); // Получаем строку, на которую кликнули
    if (!clickedRow) return; // Если клик был не на строке, прекращаем выполнение
    // Получаем данные из ячеек строки
    const cells = clickedRow.cells;
    const rowData = Array.from(cells).map(cell => cell.textContent);
    // Создаем карточку и заполняем ее данными
    const contactCardBody = document.getElementById('contactCardBody');
    contactCardBody.innerHTML = `
    <p><strong>Компания:</strong> ${rowData[0]}</p>
    `;
    // Отображаем модальное окно с карточкой
    const contactCardModal = document.getElementById('contactCardModal');
    contactCardModal.style.display = 'block';
    // Получаем имя компании из первой ячейки строки
    const companyName = rowData[0];
    console.log("Company Name:", companyName); // Отладочный вывод
    // Загружаем данные о личном телефоне из базы данных
    loadPersonalPhone(companyName);
    function loadPersonalPhone(companyName) {
      const xhr = new XMLHttpRequest();
      // Устанавливаем обработчик события изменения состояния запроса
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          // Получаем ответ от сервера
          const response = xhr.responseText;
          console.log("Server Response:", response);
          const phone = rowData[4];
          // Обновляем содержимое строки с личным телефоном
          const personalPhoneElement = document.getElementById('personalPhone');
          personalPhoneElement.textContent = response || 'Нет данных';
          const companyId = document.getElementById('companyId');
          personalPhoneElement.textContent = response || 'Нет данных';
             contactCardBody.innerHTML += `
             <p><strong>Город:</strong> ${rowData[1]}</p>
             <p><strong>ФИО:</strong> ${rowData[2]}</p>
             <p><strong>Должность:</strong> ${rowData[3]}</p>
             <p><strong>Телефон:</strong> ${rowData[4]} <strong>Доб:</strong> ${rowData[5]}</p>
             <p><strong>Личный телефон:</strong>${response}</p>
             <p><strong>Почта:</strong> ${rowData[6]}</p>
             <p><strong>Примечание:</strong> ${rowData[7]}</p>
             <button id="deleteButton">Удалить</button>
            `;
            document.getElementById('deleteButton').addEventListener('click', function() {
              if (confirm(`Вы уверены, что хотите удалить запись компании ${companyName}?`)) {
                  deleteRecord(phone);
              }
          });
          }
      };
      // Открываем соединение и отправляем запрос на сервер
      xhr.open('GET', `../executable_files/Save/load_personal_phone.php?name=${encodeURIComponent(companyName)}`, true);
      xhr.send();
    }
  });
  // Функция для удаления записи
  function deleteRecord(phone) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '../executable_files/Delete/delete_record.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        showNotification('Запись успешно удалена');
          contactCardModal.style.display = 'none';
          setTimeout(() => location.reload(), 3000); // Перезагружаем страницу после уведомления
      }
  };
  xhr.send(`phone=${encodeURIComponent(phone)}`);
  }
  // Закрытие модального окна при клике на кнопку "Закрыть"
  const closeModal3 = document.getElementsByClassName('close3')[0];
  closeModal3.onclick = function() {
    const contactCardModal = document.getElementById('contactCardModal');
    contactCardModal.style.display = 'none';
  };
  // Закрытие модального окна при клике вне карточки
  window.onclick = function(event) {
    const contactCardModal = document.getElementById('contactCardModal');
    if (event.target == contactCardModal) {
      contactCardModal.style.display = 'none';
    }
  };
  // Обработчик клика на кнопку "Удалить"
  document.getElementById('deleteButton').addEventListener('click', function() {
      if (confirm(`Вы уверены, что хотите удалить запись компании ${companyName}?`)) {
          deleteRecord(companyName);
      }
  });
 // Проверка, авторизован ли пользователь
  function isUserLoggedIn() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../executable_files/auntitification/check_auth.php", false);
    xhr.send(null);
    return xhr.responseText === "authorized";
  }
  // Отправка запроса для обновления времени авторизации
  function updateUserActivity() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../executable_files/auntitification/update_activity.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("action=update_activity");
  }
    // События, отслеживающие активность пользователя
    document.addEventListener('click', updateUserActivity);
    document.addEventListener('keydown', updateUserActivity);
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
});

//для быстрого ввода, позволяет получить компании и вставить их аддрес и название.
document.addEventListener('DOMContentLoaded', function() {
  const companyInput = document.getElementById('companyInput');
  const companyList = document.getElementById('companyList');
  const cityInput = document.getElementById('city'); // Поле для адреса компании
  companyExist = false;

  companyInput.addEventListener('input', function() {
    const query = companyInput.value;
    if (query.length > 1) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `../executable_files/Save/search_companies.php?query=${encodeURIComponent(query)}`, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Response:', xhr.responseText); // Логируем ответ
            try {
              const companies = JSON.parse(xhr.responseText);
              companyList.innerHTML = ''; // Очистить текущий список
              
              if (companies.length > 0) {
                companyInput.style.borderColor = ''; // Сбросить цвет обводки
                companies.forEach(company => {
                  const option = document.createElement('option');
                  option.value = company.company_name; // Используем название компании
                  option.setAttribute('data-address', company.company_address); // Сохраняем адрес компании
                  companyList.appendChild(option);
                  companyExist = true;
                });
              } else {
                companyInput.style.borderColor = 'red'; // Изменить цвет обводки на красный
                companyInput.setCustomValidity('Нет такой компании, пожалуйста сначала создайте компанию');
                companyExist = false;
              }
            } catch (e) {
              console.error('Ошибка при разборе ответа JSON:', e, xhr.responseText);
              companyInput.style.borderColor = 'red';
              companyInput.setCustomValidity('Произошла ошибка при поиске компании');
            }
          } else {
            console.error('Ошибка при получении списка компаний:', xhr.statusText);
            companyInput.style.borderColor = 'red';
            companyInput.setCustomValidity('Произошла ошибка при получении данных');
          }
          companyInput.reportValidity(); // Показать сообщение об ошибке
        }
      };
      xhr.send();
    } else {
      companyInput.style.borderColor = ''; // Сбросить цвет обводки
      companyInput.setCustomValidity(''); // Сбросить сообщение об ошибке
      companyInput.reportValidity();
    }
  });

  companyInput.addEventListener('change', function() {
    const selectedOption = Array.from(companyList.options).find(option => option.value === companyInput.value);
    if (selectedOption) {
      const address = selectedOption.getAttribute('data-address');
      cityInput.value = address; // Заполняем поле города (адреса)
    } else {
      cityInput.value = ''; // Очистить поле города, если компания не найдена
    }
  });
});

