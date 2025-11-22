-- Reflect Journal Database Schema (MySQL)

-- Table: users
CREATE TABLE users (
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       email VARCHAR(255) UNIQUE NOT NULL,
                       password VARCHAR(255) NOT NULL,
                       default_playlist_id INT DEFAULT 1,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: questions
CREATE TABLE questions (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           day INT NOT NULL CHECK (day >= 1 AND day <= 31),
    month INT NOT NULL CHECK (month >= 1 AND month <= 12),
    question_text TEXT NOT NULL,
    playlist_id INT DEFAULT 1,
    UNIQUE KEY unique_question (day, month, playlist_id)
);

-- Table: answers
CREATE TABLE answers (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         user_id INT NOT NULL,
                         question_id INT NOT NULL,
                         answer_text TEXT NOT NULL,
                         year INT NOT NULL,
                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         UNIQUE KEY unique_answer (user_id, question_id, year),
                         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                         FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Indexes for better query performance
CREATE INDEX idx_questions_date ON questions(month, day);
CREATE INDEX idx_questions_playlist ON questions(playlist_id);
CREATE INDEX idx_answers_user ON answers(user_id);
CREATE INDEX idx_answers_question ON answers(question_id);
CREATE INDEX idx_answers_year ON answers(year);

-- Insert test questions
INSERT INTO questions (day, month, question_text, playlist_id) VALUES
                                                                   (1, 1, 'What are your intentions for this new year?', 1),
                                                                   (2, 1, 'What made you smile today?', 1),
                                                                   (3, 1, 'What is one thing you are grateful for?', 1),
                                                                   (4, 1, 'What did you learn today?', 1),
                                                                   (5, 1, 'Who inspired you today and why?', 1),
                                                                   (22, 11, 'What are you most proud of this month?', 1),
                                                                   (23, 11, 'What challenge are you currently facing?', 1),
                                                                   (24, 11, 'What small win did you have today?', 1),
                                                                   (25, 11, 'What are you looking forward to?', 1),
                                                                   (26, 11, 'How did you take care of yourself today?', 1);