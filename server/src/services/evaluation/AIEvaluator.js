import { GoogleGenAI } from "@google/genai";
import Evaluator from "./Evaluator.js";

class AIEvaluator extends Evaluator {
  async evaluate(submission, problem) {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
You are an expert Low-Level Design interviewer and software architect.

Evaluate the learner's LLD solution.

IMPORTANT:
- There can be multiple valid LLD designs.
- Do NOT require one canonical solution.
- Evaluate the quality of the design and reasoning.
- Focus on responsibilities, abstractions, relationships,
  extensibility, cohesion, coupling and trade-offs.
- Do not evaluate programming syntax.
- Give constructive feedback that helps the learner improve.

PROBLEM
Title:
${problem.title}

Description:
${problem.description}

Requirements:
${JSON.stringify(problem.requirements, null, 2)}

Constraints:
${JSON.stringify(problem.constraints, null, 2)}

LEARNER SOLUTION

Classes:
${JSON.stringify(submission.classes, null, 2)}

Interfaces:
${JSON.stringify(submission.interfaces, null, 2)}

Relationships:
${JSON.stringify(submission.relationships, null, 2)}

Design Explanation:
${submission.explanation || "No explanation provided."}

Evaluate the solution using these dimensions:

1. Responsibility assignment
2. Abstraction and interfaces
3. Relationships
4. Cohesion and coupling
5. Extensibility
6. Design patterns where appropriate
7. Alignment with requirements
8. Quality of reasoning

Return the evaluation using the required JSON structure.
`;

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",

      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",
          properties: {
            score: {
              type: "integer",
              description: "Overall LLD quality score from 0 to 100",
            },

            strengths: {
              type: "array",
              items: {
                type: "string",
              },
            },

            issues: {
              type: "array",
              items: {
                type: "string",
              },
            },

            suggestions: {
              type: "array",
              items: {
                type: "string",
              },
            },

            questions: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },

          required: [
            "score",
            "strengths",
            "issues",
            "suggestions",
            "questions",
          ],
        },
      },
    });

    const result = JSON.parse(response.text);

    return {
      score: Math.max(
        0,
        Math.min(100, Number(result.score) || 0)
      ),

      strengths: Array.isArray(result.strengths)
        ? result.strengths
        : [],

      issues: Array.isArray(result.issues)
        ? result.issues
        : [],

      suggestions: Array.isArray(result.suggestions)
        ? result.suggestions
        : [],

      questions: Array.isArray(result.questions)
        ? result.questions
        : [],
    };
  }
}

export default AIEvaluator;