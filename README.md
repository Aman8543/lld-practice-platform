# LLD Practice Platform

A focused web platform for practicing **Low-Level Design (LLD)** through real-world problems, structured design submissions, automated evaluation, AI-assisted feedback, and attempt history.

## 🚀 Live Demo

### Frontend
https://lld-practice-platform-ruddy-theta.vercel.app

### Backend API
https://lld-practice-platform-s5uc.onrender.com/api

---

## 📌 Problem Statement

Low-Level Design problems are open-ended. Unlike traditional coding problems, there can be multiple valid designs for the same requirement.

Learners often struggle with:

- Deciding which classes are required
- Assigning responsibilities correctly
- Choosing appropriate interfaces
- Defining relationships between components
- Understanding coupling and cohesion
- Knowing whether their design is extensible
- Getting useful feedback after completing a design

This project provides a practice loop:

**Choose Problem → Design → Submit → Get Feedback → Review → Try Again**

---

## 🎯 Project Goals

The main goal is to help learners practice LLD in an interactive environment and receive useful, explainable feedback on their designs.

The platform focuses on:

- Domain modeling
- Classes and responsibilities
- Interfaces
- Relationships
- Design reasoning
- Extensibility
- Feedback and iteration

---

## ✨ Features

### 1. LLD Problems

The platform currently provides three problems:

- Parking Lot
- Vending Machine
- Elevator

Each problem contains:

- Problem description
- Requirements
- Constraints
- Design expectations

---

### 2. Structured Design Editor

Learners can create:

- Classes
- Fields
- Methods
- Interfaces
- Relationships

Supported relationship types:

- Association
- Aggregation
- Composition
- Inheritance
- Implements

Learners can also provide a written explanation of their design.

---

### 3. Save Draft

Learners can save their current design and continue working later.

The draft contains:

- Classes
- Interfaces
- Relationships
- Explanation

---

### 4. Hybrid Evaluation

The platform uses two evaluation approaches.

#### Rule-Based Evaluation

The deterministic evaluator checks objective structural conditions such as:

- Whether classes are present
- Duplicate class names
- Explanation length
- Valid relationship references

#### AI Evaluation

The AI evaluator reviews the design from a qualitative LLD perspective.

It evaluates:

- Responsibility assignment
- Abstraction
- Interfaces
- Relationships
- Coupling
- Cohesion
- Extensibility
- Design patterns where appropriate
- Requirement alignment
- Design reasoning

The AI evaluator does **not** require one specific canonical design because multiple LLD solutions can be valid.

---

## 📊 Evaluation Score

The final score is calculated using:

```text
Final Score
    =
40% Rule-Based Evaluation
+
60% AI Evaluation