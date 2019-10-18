function fadeOut(el) {
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= .1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
};

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
};

class Exam {
  constructor(elemObj) {
    this.activeBoxIndex = 0;
    this.app = document.getElementById(elemObj.elemId);
    this.nextBtn = document.getElementById(elemObj.nextBtnId);
    this.checkBtn = document.getElementById(elemObj.checkBtnId);
    this.questions = document.querySelectorAll(".question-block");
    this.nextBtn.addEventListener("click", this.nextQuestion);
    this.checkBtn.addEventListener("click", this.checkExam);
    this.init();
  }
  nextQuestion = () => {
    this.init();

    if (!this.questions[this.activeBoxIndex]) {
      this.nextBtn.classList.add("hide");
      this.checkBtn.classList.remove("hide");
    }
  }
  checkExam = () => {
    let result = [];

    for (let i = 0; i < this.questions.length; i++) {
      let response = this.checkOneQuestion(this.questions[i]);
      result.push(response);
    }
    this.printResult(result);
  }
  printResult = (result) => {
    console.log(result);
  }
  checkOneQuestion = (question) => {
    let answers = question.querySelectorAll("input[type=radio]");
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      if (answer.checked) {
        if (answer.hasAttribute("data-true")) {
          return true;
        } else {
          return false;
        }
      }
    }
    return null;
  }
  init = () => {
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].classList.add("hide");
    }
    this.questions[this.activeBoxIndex].classList.remove("hide");
    this.activeBoxIndex++;
  }
}

let exam = new Exam({
  elemId: "app",
  nextBtnId: "next",
  checkBtnId: "check"
});