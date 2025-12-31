// ===============================
// COURSE SECTIONS (66)
// ===============================
const sections = [
  { id: 1, title: "Introduction" },
  { id: 2, title: "The Field of Data Science – Various Disciplines" },
  { id: 3, title: "Connecting the Data Science Disciplines" },
  { id: 4, title: "Benefits of Each Discipline" },
  { id: 5, title: "Popular Data Science Techniques" },
  { id: 6, title: "Popular Data Science Tools" },
  { id: 7, title: "Careers in Data Science" },
  { id: 8, title: "Debunking Common Misconceptions" },
  { id: 9, title: "Probability – Introduction" },
  { id: 10, title: "Probability – Combinatorics" },
  { id: 11, title: "Probability – Bayesian Inference" },
  { id: 12, title: "Probability – Distributions" },
  { id: 13, title: "Probability – Other Fields" },
  { id: 14, title: "Statistics – Introduction" },
  { id: 15, title: "Statistics – Descriptive Statistics" },
  { id: 16, title: "Statistics – Descriptive Statistics (Practical)" },
  { id: 17, title: "Statistics – Inferential Statistics Fundamentals" },
  { id: 18, title: "Statistics – Confidence Intervals" },
  { id: 19, title: "Statistics – Inferential Statistics (Practical)" },
  { id: 20, title: "Statistics – Hypothesis Testing" },
  { id: 21, title: "Statistics – Hypothesis Testing (Practical)" },
  { id: 22, title: "Python – Introduction" },
  { id: 23, title: "Python – Variables and Data Types" },
  { id: 24, title: "Python – Basic Syntax" },
  { id: 25, title: "Python – Other Operators" },
  { id: 26, title: "Python – Conditional Statements" },
  { id: 27, title: "Python – Functions" },
  { id: 28, title: "Python – Sequences" },
  { id: 29, title: "Python – Iterations" },
  { id: 30, title: "Python – Advanced Tools" },
  { id: 31, title: "Advanced Statistics – Introduction" },
  { id: 32, title: "Advanced Statistics – Linear Regression (Statsmodels)" },
  { id: 33, title: "Advanced Statistics – Multiple Linear Regression" },
  { id: 34, title: "Advanced Statistics – Linear Regression (sklearn)" },
  { id: 35, title: "Advanced Statistics – Regression (Practical)" },
  { id: 36, title: "Advanced Statistics – Logistic Regression" },
  { id: 37, title: "Advanced Statistics – Cluster Analysis" },
  { id: 38, title: "Advanced Statistics – K-Means Clustering" },
  { id: 39, title: "Advanced Statistics – Other Clustering Methods" },
  { id: 40, title: "ChatGPT for Data Science" },
  { id: 41, title: "Case Study – Naive Bayes with ChatGPT" },
  { id: 42, title: "Mathematics for Data Science" },
  { id: 43, title: "Deep Learning – Introduction" },
  { id: 44, title: "Deep Learning – Neural Networks" },
  { id: 45, title: "Deep Learning – Neural Network from Scratch (NumPy)" },
  { id: 46, title: "Deep Learning – TensorFlow 2 Introduction" },
  { id: 47, title: "Deep Learning – Deep Neural Networks" },
  { id: 48, title: "Deep Learning – Overfitting" },
  { id: 49, title: "Deep Learning – Initialization" },
  { id: 50, title: "Deep Learning – Gradient Descent & Learning Rate" },
  { id: 51, title: "Deep Learning – Preprocessing" },
  { id: 52, title: "Deep Learning – MNIST Classification" },
  { id: 53, title: "Deep Learning – Business Case" },
  { id: 54, title: "Deep Learning – Conclusion" },
  { id: 55, title: "Appendix – TensorFlow 1 Introduction" },
  { id: 56, title: "Appendix – TensorFlow 1 MNIST" },
  { id: 57, title: "Appendix – TensorFlow 1 Business Case" },
  { id: 58, title: "Software Integration" },
  { id: 59, title: "Case Study – What’s Next" },
  { id: 60, title: "Case Study – Absenteeism Preprocessing" },
  { id: 61, title: "Case Study – ML Absenteeism Project" },
  { id: 62, title: "Case Study – Loading Absenteeism Module" },
  { id: 63, title: "Case Study – Tableau Analysis" },
  { id: 64, title: "Appendix – Additional Python Tools" },
  { id: 65, title: "Appendix – Pandas Fundamentals" },
  { id: 66, title: "Bonus Lecture" }
];

// ===============================
// LOCAL STORAGE HELPERS
// ===============================
const STORAGE_KEY = "course_progress_365careers";

function loadProgress() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

// ===============================
// RENDER
// ===============================
const list = document.getElementById("sectionList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const powerBI = document.getElementById("powerBI");

function render() {
  list.innerHTML = "";
  const progress = loadProgress();

  let completed = 0;

  sections.forEach(section => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-3";
    checkbox.checked = !!progress[section.id];

    checkbox.addEventListener("change", () => {
      progress[section.id] = checkbox.checked;
      saveProgress(progress);
      render();
    });

    if (checkbox.checked) completed++;

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(`${section.id}. ${section.title}`));
    list.appendChild(li);
  });

  updateProgress(completed);
}

// ===============================
// PROGRESS + POWER BI
// ===============================
function updateProgress(done) {
  const total = sections.length;
  const percent = Math.round((done / total) * 100);

  progressBar.style.width = percent + "%";
  progressBar.textContent = percent + "%";

  progressText.textContent = `${done} / ${total} sections completed`;

  if (percent >= 50) {
    powerBI.className = "alert alert-success text-center";
    powerBI.textContent = "🏆 Power BI Course UNLOCKED!";
  } else {
    powerBI.className = "alert alert-warning text-center";
    powerBI.textContent = "🔒 Power BI Course Locked (50% required)";
  }
}

// ===============================
// INIT
// ===============================
document.getElementById("date").textContent = new Date().toDateString();
render();
