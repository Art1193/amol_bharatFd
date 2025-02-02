# AmolBharatFD

## Introduction
This project is a multilingual FAQ management system built using **Node.js, React, MongoDB, and Redis**. It allows users to create, manage, and retrieve frequently asked questions with multi-language support. The system is designed for efficiency, integrating a **WYSIWYG editor** for rich-text formatting and utilizing **Redis for caching** to enhance performance.

With its robust architecture and seamless multilingual integration, this project ensures efficient FAQ management while maintaining high performance and scalability.

## Installation  

### Prerequisites  
Before you begin, ensure you have the following installed:  
- **Node.js** (v16 or later)  
- **Redis** (for caching)  
- **MongoDB** (for database storage)  
- **Docker** (optional, for containerized deployment)  

### Steps  

**1. Clone the Repository**  
```sh
git clone https:https://github.com/Art1193/amol_bharatFd
cd your-repo
```

**2. Install Dependencies**  
```sh
npm install
```

**3. Start Redis (Ensure Redis is running before starting the app)**  
```sh
redis-server
```

**4. Set Up Environment Variables**  
Create a `.env` file in the project root and configure your variables:
```
PORT=5000
REDIS_HOST=localhost
REDIS_PORT=6379
MONGO_URI=mongodb://localhost:27017/faqdb
```

**5. Start the Server**  
```sh
npm start
```

**6. Run the React Frontend**  
```sh
cd client
npm install
npm start
```

**7. Optional: Run with Docker**  
If you prefer running the project in a containerized environment, use Docker:
```sh
docker-compose up --build
```

## How It Works
The project focuses on creating a **multilingual FAQ system** using **Node.js and MongoDB**, where each FAQ consists of a **question and a rich-text answer**, supported by a **WYSIWYG editor**. Users can easily format answers using this editor. 

The system supports **multi-language translations**, dynamically storing translations like `question_hi` and `question_bn` for different languages. **Google Translate API** or `googletrans` is used to automate translations during FAQ creation, with **English as a fallback** when translations are unavailable.

A **REST API** allows users to manage FAQs, with language selection through a `?lang=` query parameter. The API is optimized using **Redis caching** for fast responses. 

The **MongoDB database** stores FAQs, while the **Redis cache** speeds up retrieval for frequently accessed data. The project includes authentication and authorization mechanisms for secure access.

Unit tests are written using **Jest**, ensuring reliability. **Git** is used for version control with clear commit messages. Additionally, it supports **Docker deployment** for easy scaling, with optional deployment to **Heroku or AWS**.

![WhatsApp Image 2025-02-02 at 02 06 16_e4b837b0](https://github.com/user-attachments/assets/899d58ca-585d-42e3-ac97-209b1a692027)
![WhatsApp Image 2025-02-02 at 02 06 16_bd076475](https://github.com/user-attachments/assets/a29aab40-141d-44a1-95b5-77918858a488)
![WhatsApp Image 2025-02-02 at 02 06 16_0335cc16](https://github.com/user-attachments/assets/19593812-e480-4746-b676-79ac432744ba)
![WhatsApp Image 2025-02-02 at 02 06 17_80c96d68](https://github.com/user-attachments/assets/0ba4ead9-c4ed-4ef0-9145-2a534c61183d)



## Technologies Used
- **React**: A JavaScript library for building the frontend of the application.
- **Node.js**: A JavaScript runtime used for building the backend and API.
- **MongoDB**: A NoSQL database used for storing FAQ data and other related information.
- **Redis**: Used as a caching mechanism to store translations and improve performance.
- **Express**: A Node.js framework for building RESTful APIs to manage FAQs and handle requests.
- **Google Translate API / googletrans**: Utilized for automating multi-language translations of FAQ content.
- **Docker**: For containerizing the application and ensuring consistent deployment across environments.
- **Git**: Version control system used for managing the project code.

## Contributor
- **Amol Thakur**: [GitHub Profile](https://github.com/Art1193)

