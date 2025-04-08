<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Карточка с компанией</title>
  <link rel="icon" href="assets\icon\main_ico.png" type="image/x-icon">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link href="assets\style_company.css" rel="stylesheet">
</head>
  <body>
    <header>
      <div class="info">
        <div class="nav-bar">
            <div class="nav-links">
            <a href="company.php" class="active">Мои компании</a>
            <a href="index.php">Контакты</a>
            </div>
            <button id="loginButton"><i class="fas fa-user"></i></button>
        </div>

        <div class="search">
          <input type="text" id="searchInput" placeholder="Поиск...">
        </div>
      </div>
    </header>
  
    <div class="cards-container">
      <div class="card plus-card" onclick="addCard()">
        <div class="plus">+</div>
      </div>


      
      <!-- Данные из базы данных -->
      <?php
      // Подключение к базе данных
      $servername = "db"; // Имя сервиса базы данных в docker-compose.yml
      $username = "user";
      $password = "password";
      $dbname = "companydb";
      $conn = new mysqli($servername, $username, $password, $dbname);
      // Проверка подключения
      if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
      }
      // Запрос к базе данных
      $sql = "SELECT * FROM company";
      $result = $conn->query($sql);
      // Вывод данных в карточки компаний
      if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<div class='card'>";
                echo "<h3>" . $row['company_name'] . "</h3>";
                echo "<p>" . $row['company_address'] . "</p>";
                echo "<p>" . $row['company_phone'] . "</p>";
                echo "<p>" . $row['company_inn'] . "</p>";
                echo "<p>" . $row['company_website'] . "</p>";
                echo "<p>" . $row['company_email'] . "</p>";
                echo "<p>" . $row['company_note'] . "</p>";
                echo "<div class='card-buttons'>";
                    echo "<button class='edit-button custom-button'><i class='fas fa-edit'></i></button>";
                echo "</div>";
            echo "</div>";
        }
    } else {
      }
      $conn->close();
      ?>  
    </div>



      <!-- Модальное окно для редактирования компании -->
<div id="editModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Редактирование компании</h2>
        <form id="editCompanyForm">
            <input type="hidden" id="editCompanyName">
            <div>
                <label for="editNewCompanyName">Имя компании:</label>
                <input type="text" id="editNewCompanyName" required>
            </div>
            <div>
                <label for="editCompanyAddress">Адрес:</label>
                <input type="text" id="editCompanyAddress">
            </div>
            <div>
                <label for="editCompanyPhone">Телефон:</label>
                <input type="text" id="editCompanyPhone">
            </div>
            <div>
                <label for="editCompanyInn">ИНН:</label>
                <input type="text" id="editCompanyInn">
            </div>
            <div>
                <label for="editCompanyWebsite">Веб сайт:</label>
                <input type="text" id="editCompanyWebsite">
            </div>
            <div>
                <label for="editCompanyEmail">Почта:</label>
                <input type="text" id="editCompanyEmail">
            </div>
            <div>
                <label for="editCompanyNote">Примечание:</label>
                <textarea id="editCompanyNote"></textarea>
            </div>
            <div class="modal-buttons">
                <button type="button" id="saveEdit">Сохранить</button>
                <button id="deleteCompanyModal" class="delete-button custom-button"><i class="fas fa-trash"></i></button>
            </div>
        </form>
    </div>
</div>



<!-- Модальное окно авторизации -->
<div id="loginModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Авторизация</h2>
        <form id="loginForm">
            <div>
                <label for="username">Имя пользователя:</label>
                <input type="text" id="username" name="username" required>
            </div>
            <div>
                <label for="password">Пароль:</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="button" id="loginSubmit">Войти</button>
        </form>
        <h2>Регистрация</h2>
        <form id="registerForm">
            <div>
                <label for="registerUsername">Имя пользователя:</label>
                <input type="text" id="registerUsername" name="username" required>
            </div>
            <div>
                <label for="registerPassword">Пароль:</label>
                <input type="password" id="registerPassword" name="password" required>
            </div>
            <button type="button" id="registerSubmit">Зарегистрироваться</button>
        </form>
    </div>
</div>



    <script src="JS\company_script.js"></script>
  </body>
</html>