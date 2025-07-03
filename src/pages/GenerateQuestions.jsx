// src/pages/GenerateQuestions.jsx
import React, { useState } from 'react';

const mockGPTResponse = (description, difficulty) => {
  const samples = {
    easy: [
      "Why do you want this role?",
      "Can you walk me through your resume?",
      "What interests you about our company?"
    ],
    challenging: [
      "How would you scale a backend system to support 1M users?",
      "Describe a time you led a high-impact project under pressure.",
      "What’s your approach to designing a full-stack application?"
    ]
  };
  return samples[difficulty].sort(() => 0.5 - Math.random()).slice(0, 3);
};

export default function GenerateQuestions() {
  const [jobText, setJobText] = useState('');
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [hasRegenerated, setHasRegenerated] = useState(false);
  const [isPro, setIsPro] = useState(false); // Toggle manually for now

  const generate = () => {
    const q = mockGPTResponse(jobText, difficulty);
    setQuestions(q);
  };

  const handleRegenerate = () => {
    if (hasRegenerated) return alert("You can only regenerate once.");
    setHasRegenerated(true);
    generate();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Paste Job Description</h1>
      <textarea
        className="w-full border rounded p-2 mb-3"
        rows={6}
        placeholder="Paste job description or link here..."
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
      />

      {isPro && (
        <div className="mb-4">
          <label className="mr-2">Question Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="easy">Easy</option>
            <option value="challenging">Challenging</option>
          </select>
        </div>
      )}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mr-2"
        onClick={generate}
      >
        Generate Questions
      </button>

      {questions.length > 0 && (
        <>
          <div className="mt-4">
            <h2 className="font-semibold mb-2">Your Questions:</h2>
            <ul className="list-disc ml-6">
              {questions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>
          {!hasRegenerated && (
            <button
              className="mt-4 bg-gray-200 px-3 py-1 rounded"
              onClick={handleRegenerate}
            >
              Regenerate
            </button>
          )}
        </>
      )}
    </div>
  );
}
