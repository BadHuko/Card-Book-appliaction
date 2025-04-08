<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="assets\icon\main_ico.png" type="image/x-icon">
  <link href="..\assets\styles.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <title>Ваша страница</title>
</head>
<body>
  <header>
    <div class="nav-bar">
      <div class="nav-links">
        <a href="index.php" class="active">Контакты</a>
        <a href="company.php">Мои компании</a>
      </div>
      <button id="loginButton"><i class="fas fa-user"></i></button>
    </div>
    <div class="search-container">
      <div class="left-elements">
        <input type="text" id="searchInput" placeholder="Поиск...">
      </div>
      <div class="right-elements">
        <button id="addButton">Добавить контакт</button>
      </div>
    </div>
    <main>
      <table id="dataTable">
        <thead>
          <tr>
            <th>Компания</th>
            <th>Адрес</th>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Телефон</th>
            <th>Добавочный</th>
            <th>Почта</th>
            <th>Примечание</th>
          </tr>
        </thead>
        <tbody>
        <?php
          $conn = new mysqli("db", "user", "password", "companydb");
          if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
          }
          $sql = "SELECT * FROM contacts ORDER BY company ASC";
          $result = $conn->query($sql);

          if ($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {
                  echo "
                  <tr>
                    <td>" . $row["company"]. "</td>
                    <td>" . $row["city"]. "</td>
                    <td>" . $row["name"]. "</td>
                    <td>" . $row["position"]. "</td>
                    <td>" . $row["phone"]. "</td>
                    <td>" . $row["addnum"]. "</td>
                    <td>" . $row["email"]. "</td>
                    <td>" . $row["note"]. "</td>
                  </tr>";
              }
          } else {
              echo "<tr><td colspan='7'>Нет данных</td></tr>";
          }
          $conn->close();
          ?>  
        </tbody>
      </table>
    </main>
  </header>

<!-- Модальное окно -->
  <div id="modal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>Добавить контакт</h2>
      <div class="form-container">
          <div class="form-row">
            <input type="text" id="companyInput" name="companyInput" list="companyList" placeholder="Компания" required>
            <datalist id="companyList">

            </datalist>
            <input type="text" id="city" name="city" placeholder="Адрес" required>
          </div>
          <div class="form-row">
            <input type="text" id="name" name="name" placeholder="ФИО" required>
            <input type="text" id="position" name="position" placeholder="Должность" required>
          </div>
          <div class="form-row">
              <input type="text" id="phone" name="phone" maxlength="20" placeholder="Рабочий номер" required>
              <input type="text" id="addnum" name="addnum" maxlength="10" placeholder="Добавочный номер">
              <input type="text" id="email" name="email" placeholder="Почта" required>
          </div>
          <div class="form-row">
            <input type="text" id="personalPhone" name="personalPhone" maxlength="20" placeholder="Личный номер">
          </div>
          <div class="textarea-container">
            <textarea id="note" name="note" placeholder="Примечание" required></textarea>
          </div>
        </div>
        <div class="button-container">
          <button id="cancelButton">Отмена</button>
          <button id="saveButton">Сохранить</button>
        </div>
      </div>
    </div>
  </div>  
  
<!-- Модальное окно карточки контакта -->
<div id="contactCardModal" class="modal">
  <div class="modal-content">
    <span class="close3">&times;</span>
    <h2>Карточка контакта</h2>
    <div id="contactCardBody" class="card-body">
      <!-- Здесь будут отображаться данные контакта -->
    </div>
  </div>
</div>


<!-- Модальное окно авторизации -->
<div id="loginModal" class="modal">
    <div class="modal-content">
        <span class="close2">&times;</span>
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
    </div>
</div>



  <script src="\JS\script.js"></script>
</body>
</html>
