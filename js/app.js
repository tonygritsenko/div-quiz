const headElem = document.querySelector(".header__wrapper");
const questionsWrapper = document.getElementById("questions-wrapper");
const quizAnswersWrapper = document.querySelector(".quiz-answers__wrapper");
const quizQuestions = document.getElementById("quiz-questions");
const pagesElem = document.getElementById("pages");
const footer = document.querySelector(".footer__wrapper");

//Класс, который представляет сам тест
class Quiz {
  constructor(type, questions, results) {
    //Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
    this.type = type;

    //Массив с вопросами
    this.questions = questions;

    //Массив с возможными результатами
    this.results = results;

    //Количество набранных очков
    this.score = 0;

    //Номер результата из массива
    this.result = 0;

    //Номер текущего вопроса
    this.current = 0;
  }

  Click(index) {
    //Добавляем очки
    let value = this.questions[this.current].Click(index);
    this.score += value;

    let correct = -1;

    //Если было добавлено хотя одно очко, то считаем, что ответ верный
    if (value >= 1) {
      correct = index;
    } else {
      //Иначе ищем, какой ответ может быть правильным
      for (let i = 0; i < this.questions[this.current].answers.length; i++) {
        if (this.questions[this.current].answers[i].value >= 1) {
          correct = i;
          break;
        }
      }
    }

    this.Next();

    return correct;
  }

  //Переход к следующему вопросу
  Next() {
    this.current++;

    if (this.current >= this.questions.length) {
      this.End();
    }
  }

  //Если вопросы кончились, этот метод проверит, какой результат получил пользователь
  End() {
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i].Check(this.score)) {
        this.result = i;
      }
    }
  }
}

//Класс, представляющий вопрос
class Question {
  constructor(text, answers) {
    this.text = text;
    this.answers = answers;
  }

  Click(index) {
    return this.answers[index].value;
  }
}

//Класс, представляющий ответ
class Answer {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }
}

//Класс, представляющий результат
class Result {
  constructor(text, value) {
    this.text = text;
    this.value = value;
  }

  //Этот метод проверяет, достаточно ли очков набрал пользователь
  Check(value) {
    if (this.value <= value) {
      return true;
    } else {
      return false;
    }
  }
}

//Массив с вопросами
let questions = [
  new Question("Что такое операционная система?", [
    new Answer(
      "Это просто программа на компьютере, как и другие - Word или Chrome",
      0
    ),
    new Answer(
      "Это показатель того, какой процессор используется на компьютере. Например, 32-битный или 64-битный",
      0
    ),
    new Answer(
      "Это набор взаимосвязанных программ, осуществляющих управление компьютером и взаимодействие с пользователем",
      1
    ),
    new Answer('Нет такого понятия, есть понятие "файловая система"', 0),
  ]),

  new Question("Является ли Android операционной системой?", [
    new Answer(
      "Да, это такая же ОС, как и другие, просто для мобильных девайсов",
      1
    ),
    new Answer("Нет, операционные системы бывают только для ПК", 0),
    new Answer(
      "Нет, Android это программа, которая ставится на операционную систему девайса. ОС на разных девайсах разные",
      0
    ),
    new Answer("Это домашняя страничка в настройках вашего браузера", 0),
  ]),

  new Question("Что такое процессор компьютера?", [
    new Answer(
      "Это блок, внутри которого находится дисковод и много разъемов для монитора, клавиатуры и компьютерной мышки",
      0
    ),
    new Answer("Это общее название всех комплектующих компьютера", 0),
    new Answer(
      "Это элемент компьютера, с помощью которого обрабатывается информация, находящаяся как в собственной памяти, так и в памяти других устройств",
      1
    ),
    new Answer(
      "Это суммарный показатель вычислительной мощности компьютера, например 2,7 ГГц",
      0
    ),
  ]),

  new Question("Какие бывают разрядности у современных процессоров?", [
    new Answer("32 и 64 бита", 1),
    new Answer("12 и 32 бита", 0),
    new Answer("15 и 32 бита", 0),
    new Answer("86 и 64 бита", 0),
  ]),

  new Question(
    "Какой тип процессора чаще всего используют мобильные девайсы?",
    [
      new Answer("iOS использует Intel, остальные используют AMD", 0),
      new Answer("Чаще всего используют Intel", 0),
      new Answer("Чаще всего используют AMD", 0),
      new Answer("Чаще всего используют ARM", 1),
    ]
  ),

  new Question("Для чего компьютеру нужна RAM?", [
    new Answer("Для быстрого доступа к данным", 1),
    new Answer("Для долгосрочного хранения данных", 0),
    new Answer("Для правильной фрагментации памяти", 0),
    new Answer("Для дефрагментации данных", 0),
  ]),

  new Question("Чем отличается HDD от SSD?", [
    new Answer(
      "HDD - это твердотельный накопитель без подвижных частей. Более дешевый, чем SSD. HDD работает быстрее",
      0
    ),
    new Answer(
      "HDD - это твердотельный накопитель без подвижных частей. Более дорогой, чем SSD. HDD работает быстрее",
      0
    ),
    new Answer(
      "SSD - это твердотельный накопитель без подвижных частей. Более дешевый, чем HDD. SSD работает быстрее",
      0
    ),
    new Answer(
      "SSD - это твердотельный накопитель без подвижных частей. Более дорогой, чем HDD. SSD работает быстрее",
      1
    ),
  ]),

  new Question("Как отличаются между собой USB?", [
    new Answer("Бывают только USB 2.0 и 3.2", 0),
    new Answer("Бывают только micro-USB и mini-USB", 0),
    new Answer(
      "USB отличаются по пропускной способности (micro-USB, mini-USB, lightning и т.д.) и форме (USB 2.0, USB 3.2)",
      0
    ),
    new Answer(
      "USB отличаются по форме (micro-USB, mini-USB, lightning и т.д.) и пропускной способности (USB 2.0, USB 3.2)",
      1
    ),
  ]),

  new Question("Какой файловой системы не существует?", [
    new Answer("Fat", 0),
    new Answer("NTFS", 0),
    new Answer("APFS", 0),
    new Answer("BolSFS", 1),
  ]),
];

// Мешаем ответы
function shuffleAnswers(answers) {
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }

  return answers;
}

// Мешаем вопросы
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  array.forEach((question) => {
    question.answers = shuffleAnswers(question.answers);
  });

  return array;
}

questions = shuffleArray(questions);

//Массив с результатами
const results = [
  new Result("Упс :(", 0),
  new Result("Хороший результат!", 1),
  new Result("Поздравляем!", questions.length),
];

// Массив для получения ответов
let answersArray = [];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

// Вывод результатов тестирования
function RenderResults(score) {
  // Убираем контент
  let ttlMain = document.getElementById("h1-ttl");
  ttlMain.className = "header__ttl ttl visually-hidden";

  let questionsSection = document.getElementById("questions");
  questionsSection.style.display = "none";

  footer.style.display = "none";

  // Добавляем контент
  let ttl = document.createElement("h2");
  ttl.className = "header__ttl ttl";
  ttl.innerHTML = quiz.results[quiz.result].text;
  headElem.append(ttl);

  let inf = document.createElement("p");
  inf.className = "header__txt txt";

  // Функция для склонения по падежам
  function declOfNum(n, text_forms) {
    n = Math.abs(n) % 100;
    var n1 = n % 10;
    if (n > 10 && n < 20) {
      return text_forms[2];
    }
    if (n1 > 1 && n1 < 5) {
      return text_forms[1];
    }
    if (n1 == 1) {
      return text_forms[0];
    }
    return text_forms[2];
  }

  // Варианты сообщений о результате
  if (score > 0 && score !== questions.length) {
    inf.innerHTML =
      "Вы ответили правильно на " +
      score +
      " " +
      declOfNum(score, ["вопрос", "вопроса", "вопросов"]) + ". Так держать!";
  } else if (score === questions.length) {
    inf.innerHTML =
      "Вы правильно ответили на все вопросы. Вы действительно отлично разбираетесь в IT.";
  } else {
    inf.innerHTML =
      "Вы неправильно ответили на все вопросы. Нужно подучить теорию.";
  }

  headElem.append(inf);

  // Создаем список полученных ответов
  let answersLst = document.createElement("ul");
  answersLst.className = "quiz-answers__lst lst-reset";
  quizAnswersWrapper.prepend(answersLst);

  for (let i = 0; i < questions.length; i++) {
    //Создаем элементы списка
    let answersItm = document.createElement("li");
    answersItm.className = "quiz-answers__itm";
    answersLst.append(answersItm);

    // Добавляем вопрос к элементу списка
    let quizQ = document.createElement("h3");
    quizQ.className = "quiz-answers__ttl ttl";
    quizQ.innerHTML = questions[i].text;
    answersItm.append(quizQ);

    if (answersArray[i]) {
      // Добавляем ответ к элементу списка
      let resultAnswer = document.createElement("p");
      resultAnswer.className = "quiz-answers__txt txt";
      resultAnswer.innerHTML = answersArray[i].innerText;

      let value = answersArray[i].getAttribute("value");

      // Подкрашиваем элементы
      if (value > 0) {
        answersItm.className = "quiz-answers__itm correct";
      } else {
        answersItm.className = "quiz-answers__itm wrong";
      }

      answersItm.append(resultAnswer);
    }
  }
}

//Обновление теста
function Update() {
  let quizLength = quiz.questions.length;

  //Проверяем, есть ли ещё вопросы
  if (quiz.current < quizLength) {
    //Если есть, меняем вопрос в заголовке
    let questionsTtl = document.querySelector(".quiz-questions__ttl");
    questionsTtl.innerHTML = quiz.questions[quiz.current].text;

    //Удаляем старые варианты ответов
    quizQuestions.innerHTML = "";

    //Создаём кнопки для новых вариантов ответов
    for (let i = 0; i < quiz.questions[quiz.current].answers.length; i++) {
      let radio = document.createElement("input");
      radio.className = "radio";
      radio.type = "radio";
      radio.setAttribute("index", i);
      radio.setAttribute("name", "choice");
      radio.id = "radio" + i;

      let label = document.createElement("label");
      label.className = "label";
      label.setAttribute("for", radio.id);
      label.setAttribute("index", i);
      label.innerHTML = quiz.questions[quiz.current].answers[i].text;

      let QQItm = document.createElement("li");
      QQItm.className = "quiz-questions__itm";
      QQItm.append(radio);
      QQItm.append(label);

      quizQuestions.append(QQItm);
    }

    // Работа с прогресс-баром
    let progressBar = document.getElementById("progress-bar");
    progressBar.setAttribute("value", quiz.current + 1);
    progressBar.setAttribute("max", quizLength);

    let value = progressBar.getAttribute("value");
    let progressValue = document.getElementById("progress-value");

    if (value >= quizLength) {
      progressValue.textContent = "";
    } else {
      progressValue.textContent = value;
    }

    if (value > 0) {
      let leftPosition = value * (100 / quizLength);
      progressValue.style.left = leftPosition - 1 + "%";
    }

    //Выводим номер текущего вопроса
    let total = document.getElementById("total");
    total.innerHTML = quizLength;

    //Вызываем функцию, которая прикрепит события к новым кнопкам
    Init();
  } else {
    //Если это конец, то выводим результат
    if (quiz.score < quizLength) {
      RenderResults(quiz.score);

      // Изменение стилей кнопки "пройти еще раз"
      let reloadButton = document.querySelector(".quiz-answers__btn");
      reloadButton.className = "btn-reset quiz-answers__btn btn-active";

      // Функционал кнопки
      reloadButton.addEventListener("click", function () {
        location.reload();
      });
    } else {
      RenderResults(quiz.score);
    }
  }
}

function Init() {
  //Находим все кнопки
  let btns = document.getElementsByClassName("radio");

  for (let i = 0; i < btns.length; i++) {
    //Прикрепляем событие для каждой отдельной кнопки
    btns[i].addEventListener("click", function (e) {
      Click(e.target.getAttribute("index"));
    });
  }
}

function Click(index) {
  //Получаем номер правильного ответа
  let correct = quiz.Click(index);

  //Находим все кнопки
  let label = document.getElementsByClassName("label");

  //Если это тест с правильными ответами - собираем ответы
  if (quiz.type == 1) {
    if (correct >= 0) {
      label[index].setAttribute("value", 1);
      answersArray.push(label[index]);
    }

    if (index != correct) {
      label[index].setAttribute("value", 0);
    }
  }

  //Ждём полсекунды и обновляем тест
  const time = 500;
  setTimeout(Update, time);
}
