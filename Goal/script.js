

const sections = [
  { id: 1, title: "Introduction", completed: false },
  { id: 2, title: "The Field of Data Science – Various Disciplines", completed: false },
  { id: 3, title: "Connecting the Data Science Disciplines", completed: false },
  { id: 4, title: "Benefits of Each Discipline", completed: false },
  { id: 5, title: "Popular Data Science Techniques", completed: false },
  { id: 6, title: "Popular Data Science Tools", completed: false },
  { id: 7, title: "Careers in Data Science", completed: false },
  { id: 8, title: "Debunking Common Misconceptions", completed: false },

  { id: 9, title: "Probability – Introduction", completed: false },
  { id: 10, title: "Probability – Combinatorics", completed: false },
  { id: 11, title: "Probability – Bayesian Inference", completed: false },
  { id: 12, title: "Probability – Distributions", completed: false },
  { id: 13, title: "Probability – Other Fields", completed: false },

  { id: 14, title: "Statistics – Introduction", completed: false },
  { id: 15, title: "Statistics – Descriptive Statistics", completed: false },
  { id: 16, title: "Statistics – Descriptive Statistics (Practical)", completed: false },
  { id: 17, title: "Statistics – Inferential Statistics Fundamentals", completed: false },
  { id: 18, title: "Statistics – Confidence Intervals", completed: false },
  { id: 19, title: "Statistics – Inferential Statistics (Practical)", completed: false },
  { id: 20, title: "Statistics – Hypothesis Testing", completed: false },
  { id: 21, title: "Statistics – Hypothesis Testing (Practical)", completed: false },

  { id: 22, title: "Python – Introduction", completed: false },
  { id: 23, title: "Python – Variables and Data Types", completed: false },
  { id: 24, title: "Python – Basic Syntax", completed: false },
  { id: 25, title: "Python – Other Operators", completed: false },
  { id: 26, title: "Python – Conditional Statements", completed: false },
  { id: 27, title: "Python – Functions", completed: false },
  { id: 28, title: "Python – Sequences", completed: false },
  { id: 29, title: "Python – Iterations", completed: false },
  { id: 30, title: "Python – Advanced Tools", completed: false },

  { id: 31, title: "Advanced Statistical Methods – Introduction", completed: false },
  { id: 32, title: "Advanced Statistics – Linear Regression (Statsmodels)", completed: false },
  { id: 33, title: "Advanced Statistics – Multiple Linear Regression", completed: false },
  { id: 34, title: "Advanced Statistics – Linear Regression (sklearn)", completed: false },
  { id: 35, title: "Advanced Statistics – Regression (Practical)", completed: false },
  { id: 36, title: "Advanced Statistics – Logistic Regression", completed: false },
  { id: 37, title: "Advanced Statistics – Cluster Analysis", completed: false },
  { id: 38, title: "Advanced Statistics – K-Means Clustering", completed: false },
  { id: 39, title: "Advanced Statistics – Other Clustering Methods", completed: false },

  { id: 40, title: "ChatGPT for Data Science", completed: false },
  { id: 41, title: "Case Study – Naive Bayes with ChatGPT", completed: false },

  { id: 42, title: "Mathematics for Data Science", completed: false },

  { id: 43, title: "Deep Learning – Introduction", completed: false },
  { id: 44, title: "Deep Learning – Neural Networks", completed: false },
  { id: 45, title: "Deep Learning – Neural Network from Scratch (NumPy)", completed: false },
  { id: 46, title: "Deep Learning – TensorFlow 2 Introduction", completed: false },
  { id: 47, title: "Deep Learning – Deep Neural Networks", completed: false },
  { id: 48, title: "Deep Learning – Overfitting", completed: false },
  { id: 49, title: "Deep Learning – Initialization", completed: false },
  { id: 50, title: "Deep Learning – Gradient Descent & Learning Rate", completed: false },
  { id: 51, title: "Deep Learning – Preprocessing", completed: false },
  { id: 52, title: "Deep Learning – MNIST Classification", completed: false },
  { id: 53, title: "Deep Learning – Business Case", completed: false },
  { id: 54, title: "Deep Learning – Conclusion", completed: false },

  { id: 55, title: "Appendix – TensorFlow 1 Introduction", completed: false },
  { id: 56, title: "Appendix – TensorFlow 1 MNIST", completed: false },
  { id: 57, title: "Appendix – TensorFlow 1 Business Case", completed: false },

  { id: 58, title: "Software Integration", completed: false },
  { id: 59, title: "Case Study – What’s Next", completed: false },
  { id: 60, title: "Case Study – Absenteeism Preprocessing", completed: false },
  { id: 61, title: "Case Study – ML Absenteeism Project", completed: false },
  { id: 62, title: "Case Study – Loading Absenteeism Module", completed: false },
  { id: 63, title: "Case Study – Tableau Analysis", completed: false },

  { id: 64, title: "Appendix – Additional Python Tools", completed: false },
  { id: 65, title: "Appendix – Pandas Fundamentals", completed: false },
  { id: 66, title: "Bonus Lecture", completed: false }
];

// ---------------- LOCAL STORAGE ----------------
const saved = JSON.parse(localStorage.getItem("courseProgress"));
if (saved) {
  sections.forEach(sec => {
    const match = saved.find(s => s.id === sec.id);
    if (match) sec.completed = match.completed;
  });
}

const list = document.getElementById("sectionList");

function save() {
  localStorage.setItem("courseProgress", JSON.stringify(sections));
}

function render() {
  list.innerHTML = "";

  sections.forEach(sec => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-3";
    checkbox.checked = sec.completed;

    checkbox.onchange = () => {
      sec.completed = checkbox.checked;
      save();
      updateProgress();
    };

    li.appendChild(checkbox);
    li.appendChild(document.createTextNode(`${sec.id}. ${sec.title}`));
    list.appendChild(li);
  });

  updateProgress();
}

function updateProgress() {
  const completed = sections.filter(s => s.completed).length;
  const percent = Math.round((completed / sections.length) * 100);

  const bar = document.getElementById("progressBar");
  bar.style.width = percent + "%";
  bar.innerText = percent + "%";

  document.getElementById("progressText").innerText =
    `${completed} / ${sections.length} sections completed`;

  const powerBI = document.getElementById("powerBI");
  if (percent >= 50) {
    powerBI.className = "alert alert-success text-center";
    powerBI.innerText = "🏆 Power BI Course UNLOCKED!";
  } else {
    powerBI.className = "alert alert-warning text-center";
    powerBI.innerText = "🔒 Power BI Course Locked (50% required)";
  }

  renderChart(completed, sections.length - completed);
}

function renderChart(done, remaining) {
  const ctx = document.getElementById("progressChart").getContext("2d");
  if (window.chart) window.chart.destroy();

  window.chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [{
        data: [done, remaining],
        backgroundColor: ["#198754", "#dc3545"]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

document.getElementById("date").innerText = new Date().toDateString();
render();
