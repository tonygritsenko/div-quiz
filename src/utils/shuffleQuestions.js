const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

export const shuffleQuestions = (questions) => {
  shuffleArray(questions).forEach((question) => {
    question.options = shuffleArray(question.options);
  });

  return questions;
};
