# 🎓 The Impact of AI on Students' Future Career Imagination

**Master of Computer Science Research Project** **Author:** Nithin  
**University:** The University of Adelaide (Nov 2025)  
**Supervisors:** Prof. Dr. Jinan Zou, Kefan Chen, Jiayu Huang

---

## 📖 Project Overview
This repository contains the software artifact for my Master's thesis. The research investigates the **"Awareness-Imagination Gap"**—the phenomenon where students possess high confidence in using Artificial Intelligence (like ChatGPT) but fail to integrate it into their long-term career aspirations.

Through large-scale data science (analyzing 337 student records via K-Means Clustering and Random Forest Regression), this research mathematically proved that AI usage does not cure AI career anxiety. Instead, anxiety is driven by ethical concerns and a lack of perceived future opportunity. The data revealed three distinct psychological profiles governing how students view their future:
1. **The Confident Pioneer:** AI expands their career imagination.
2. **The Anxious Dependent:** AI restricts their imagination, causing career paralysis.
3. **The Skeptical Traditionalist:** AI fractures their imagination due to ethical concerns.

## 🚀 The Product: Student AI Persona Diagnostic Tool
To translate this theoretical research into practical classroom utility, I engineered this full-stack Minimum Viable Product (MVP). It empowers educators to look past the "awareness-imagination gap" and provide personalized, data-driven teaching interventions.

### Key Features
* **The Student Kiosk:** A distraction-free, public-facing React interface where students take an 18-question diagnostic survey based on a 1-to-5 Likert scale.
* **Algorithmic Classification:** The .NET backend aggregates the 18 raw inputs into 6 core research scores (Knowledge, Utility, Job Fear, Ethics, Opportunity, Concrete Examples) and runs K-Means classification logic to assign the student to their psychological persona.
* **The Teacher Dashboard:** A secure administrative panel that retrieves all student records from the local SQLite database.
* **Detailed Intervention Analysis:** Clicking on a student generates a personalized teaching plan. For example, advising teachers to explicitly teach algorithm mechanics to *Anxious Dependents*, or showing real-world AI applications to *Skeptical Traditionalists*.
* **Data Management:** Teachers can reset student attempts or delete corrupted records entirely.

---

## 🛠️ Tech Stack
**Frontend Layer:**
* React (Vite)
* Tailwind CSS (Styling)
* Axios (API Communication)
* React Router DOM (Navigation)

**Backend Layer:**
* .NET 8 Web API (N-Tier Architecture)
* C# (Controllers, Interfaces, Services, Models)
* Entity Framework Core
* SQLite (Local Database)

---
📦 StudentAIPersonaWebApplication
 ┣ 📂 BackendApi
 ┃ ┣ 📂 Controllers   # API Endpoints (QuizController.cs)
 ┃ ┣ 📂 Data          # SQLite DbContext
 ┃ ┣ 📂 Interfaces    # Dependency Injection Contracts
 ┃ ┣ 📂 Models        # Data Entities & DTOs
 ┃ ┗ 📂 Services      # K-Means Business Logic
 ┣ 📂 FrontendUI
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components  # TeacherDashboard.jsx
 ┃ ┃ ┣ 📜 App.jsx     # Student Kiosk UI & Form Logic
 ┃ ┃ ┗ 📜 main.jsx    # React Router Setup
 ┃ ┣ 📜 tailwind.config.js
 ┃ ┗ 📜 package.json
 ┗ 📜 README.md

 ___

## ⚙️ Prerequisites
To run this project locally on your machine, you must have the following installed:
1. [Node.js](https://nodejs.org/)
