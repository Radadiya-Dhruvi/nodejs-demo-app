# Node.js Web App with CI/CD Pipeline

This project demonstrates an automated CI/CD pipeline built for a Node.js web application using **GitHub Actions** and **DockerHub**.

---

## 📌 Project Overview
Whenever new code is pushed to the `main` branch, the pipeline automatically:
1. Installs dependencies and runs unit tests.
2. Builds a new Docker container image.
3. Deploys the built image to DockerHub.

---

## ⚙️ Tech Stack
* **Runtime / Framework:** Node.js, Express
* **Testing:** Jest, Supertest
* **CI/CD Platform:** GitHub Actions
* **Container Registry:** DockerHub

---

## 🚀 CI/CD Workflow
The pipeline workflow (`.github/workflows/main.yml`) consists of two main jobs:
* **`test` Job:** Checks out repository code, sets up Node.js, runs `npm install`, and verifies tests using `npm test`.
* **`build-and-push` Job:** Triggers after tests pass, logs into DockerHub via GitHub Secrets, builds the image from `Dockerfile`, and pushes it to DockerHub registry.

---

## 🐳 DockerHub Image
* **Image Repository:** `yourname/nodejs-demo-app`
* **Pull Image:**
  ```bash
  docker pull yourname/nodejs-demo-app:latest



  

