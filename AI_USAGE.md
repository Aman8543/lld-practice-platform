# AI Usage

AI tools were used during the development of this project as a development and decision-support tool. The final implementation and decisions were reviewed and adapted according to the assignment requirements and the 2-day MVP scope.

## 1. Evaluation Architecture

### Problem

LLD submissions can have multiple valid solutions, so relying only on fixed rules would not be sufficient.

### AI Suggestion

AI-assisted exploration suggested separating evaluation into different evaluators instead of putting all evaluation logic into one large service.

### Decision

I implemented an evaluator abstraction:

```text
Evaluator
├── RuleEvaluator
└── AIEvaluator