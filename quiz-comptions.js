document.addEventListener("DOMContentLoaded", () => {

  // 📌 Accordion Logic
  const accs = document.getElementsByClassName("acc");
  for (let i = 0; i < accs.length; i++) {
    accs[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const pnl = this.nextElementSibling;
      pnl.style.display = pnl.style.display === "block" ? "none" : "block";
    });
  }

  const questionsPerPage = 10;
  const questions = document.querySelectorAll(".question-block");
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const pagination = document.getElementById("pagination");

  // 📌 স্কোরবোর্ড ভ্যারিয়েবল
  let correctCount = 0;
  let wrongCount = 0;
  let totalScore = 0;

  const correctSpan = document.getElementById("correct-count");
  const wrongSpan = document.getElementById("wrong-count");
  const scoreSpan = document.getElementById("total-score");

  function updateScore() {
    correctSpan.textContent = correctCount;
    wrongSpan.textContent = wrongCount;
    scoreSpan.textContent = totalScore.toFixed(2);
  }

  // 📌 Pagination Logic
  function showPage(page) {
    questions.forEach((q, i) => {
      q.style.display =
        i >= (page - 1) * questionsPerPage && i < page * questionsPerPage
          ? "block"
          : "none";
    });

    const buttons = pagination.querySelectorAll("button");
    buttons.forEach((btn, i) => {
      btn.classList.toggle("active", i + 1 === page);
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.addEventListener("click", () => showPage(i));
    pagination.appendChild(btn);
  }

  showPage(1);
  updateScore();

  // 📌 Right/Wrong Answer + Point System
  questions.forEach(qb => {
    const options = qb.querySelectorAll(".options span");
    const correctAnswerText = qb
      .querySelector(".pnl")
      .innerText.replace("✅ Option:", "")
      .trim()
      .split("\n")[0]
      .trim();

    options.forEach(opt => {
      opt.style.cursor = "pointer";

      opt.addEventListener("click", () => {
        // একবার ক্লিকের পর আর কাজ না করুক
        options.forEach(o => (o.style.pointerEvents = "none"));

        if (opt.innerText.trim() === correctAnswerText) {
          opt.classList.add("option-correct");
          correctCount++;
          totalScore += 1;
        } else {
          opt.classList.add("option-wrong");
          wrongCount++;
          totalScore -= 0.25;

          // সঠিক অপশনও দেখাও
          options.forEach(o => {
            if (o.innerText.trim() === correctAnswerText) {
              o.classList.add("option-correct");
            }
          });
        }

        updateScore();
      });
    });
  });

});
