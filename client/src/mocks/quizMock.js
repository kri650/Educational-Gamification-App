const quizMock = [
  {
    _id: 'quiz_001',
    title: 'Algebra Fundamentals',
    subject: 'Math',
    difficulty: 'easy',
    estimatedMinutes: 5,
    questions: [
      { _id: 'q1', questionText: 'What is 12 × 12?', timeLimitSeconds: 30,
        options: [{ text: '124', isCorrect: false },{ text: '144', isCorrect: true },{ text: '134', isCorrect: false },{ text: '154', isCorrect: false }] },
      { _id: 'q2', questionText: 'Solve: 3x = 15. What is x?', timeLimitSeconds: 30,
        options: [{ text: '3', isCorrect: false },{ text: '5', isCorrect: true },{ text: '45', isCorrect: false },{ text: '12', isCorrect: false }] },
      { _id: 'q3', questionText: 'What is the square root of 81?', timeLimitSeconds: 30,
        options: [{ text: '7', isCorrect: false },{ text: '8', isCorrect: false },{ text: '9', isCorrect: true },{ text: '11', isCorrect: false }] },
      { _id: 'q4', questionText: 'What is 25% of 200?', timeLimitSeconds: 30,
        options: [{ text: '25', isCorrect: false },{ text: '40', isCorrect: false },{ text: '50', isCorrect: true },{ text: '75', isCorrect: false }] },
      { _id: 'q5', questionText: 'What is 2³?', timeLimitSeconds: 30,
        options: [{ text: '6', isCorrect: false },{ text: '8', isCorrect: true },{ text: '9', isCorrect: false },{ text: '12', isCorrect: false }] },
    ]
  },
  {
    _id: 'quiz_002',
    title: 'Basic Physics Concepts',
    subject: 'Science',
    difficulty: 'medium',
    estimatedMinutes: 7,
    questions: [
      { _id: 'q6', questionText: 'What is the unit of force?', timeLimitSeconds: 30,
        options: [{ text: 'Joule', isCorrect: false },{ text: 'Newton', isCorrect: true },{ text: 'Watt', isCorrect: false },{ text: 'Pascal', isCorrect: false }] },
      { _id: 'q7', questionText: 'Speed = Distance / ?', timeLimitSeconds: 30,
        options: [{ text: 'Mass', isCorrect: false },{ text: 'Force', isCorrect: false },{ text: 'Time', isCorrect: true },{ text: 'Energy', isCorrect: false }] },
      { _id: 'q8', questionText: 'What is the speed of light approximately?', timeLimitSeconds: 30,
        options: [{ text: '3×10⁸ m/s', isCorrect: true },{ text: '3×10⁶ m/s', isCorrect: false },{ text: '3×10⁴ m/s', isCorrect: false },{ text: '3×10¹⁰ m/s', isCorrect: false }] },
      { _id: 'q9', questionText: 'Which planet is closest to the Sun?', timeLimitSeconds: 30,
        options: [{ text: 'Venus', isCorrect: false },{ text: 'Earth', isCorrect: false },{ text: 'Mercury', isCorrect: true },{ text: 'Mars', isCorrect: false }] },
      { _id: 'q10', questionText: 'What is the chemical formula of water?', timeLimitSeconds: 30,
        options: [{ text: 'CO₂', isCorrect: false },{ text: 'H₂O', isCorrect: true },{ text: 'O₂', isCorrect: false },{ text: 'NaCl', isCorrect: false }] },
    ]
  },
  {
    _id: 'quiz_003',
    title: 'English Grammar',
    subject: 'English',
    difficulty: 'easy',
    estimatedMinutes: 5,
    questions: [
      { _id: 'q11', questionText: 'Which sentence is grammatically correct?', timeLimitSeconds: 30,
        options: [{ text: 'She go to school.', isCorrect: false },{ text: 'She goes to school.', isCorrect: true },{ text: 'She going to school.', isCorrect: false },{ text: 'She gone to school.', isCorrect: false }] },
      { _id: 'q12', questionText: 'Identify the noun: "The cat sat on the mat."', timeLimitSeconds: 30,
        options: [{ text: 'sat', isCorrect: false },{ text: 'on', isCorrect: false },{ text: 'the', isCorrect: false },{ text: 'cat', isCorrect: true }] },
      { _id: 'q13', questionText: 'What is the plural of "child"?', timeLimitSeconds: 30,
        options: [{ text: 'childs', isCorrect: false },{ text: 'childes', isCorrect: false },{ text: 'children', isCorrect: true },{ text: 'childrens', isCorrect: false }] },
      { _id: 'q14', questionText: '"She __ reading a book." Choose the correct verb.', timeLimitSeconds: 30,
        options: [{ text: 'are', isCorrect: false },{ text: 'is', isCorrect: true },{ text: 'were', isCorrect: false },{ text: 'be', isCorrect: false }] },
      { _id: 'q15', questionText: 'Which is an adjective?', timeLimitSeconds: 30,
        options: [{ text: 'Run', isCorrect: false },{ text: 'Quickly', isCorrect: false },{ text: 'Beautiful', isCorrect: true },{ text: 'And', isCorrect: false }] },
    ]
  }
]

export default quizMock
