import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const questions = [
  { question: 'What is the meaning of "Apple"?', options: ['Manzana', 'Naranja', 'Pera', 'Banana'], answer: 'Manzana' },
  { question: 'What is the meaning of "Dog"?', options: ['Gato', 'Perro', 'Pájaro', 'Ratón'], answer: 'Perro' },
  { question: 'What is the meaning of "House"?', options: ['Casa', 'Coche', 'Escuela', 'Parque'], answer: 'Casa' },
  { question: 'What is the meaning of "Book"?', options: ['Libro', 'Mesa', 'Silla', 'Ventana'], answer: 'Libro' },
  { question: 'What is the meaning of "Car"?', options: ['Avión', 'Barco', 'Coche', 'Tren'], answer: 'Coche' },
  { question: 'What is the meaning of "Water"?', options: ['Fuego', 'Agua', 'Tierra', 'Aire'], answer: 'Agua' },
  { question: 'What is the meaning of "Sun"?', options: ['Luna', 'Estrella', 'Sol', 'Nube'], answer: 'Sol' },
  { question: 'What is the meaning of "Tree"?', options: ['Árbol', 'Flor', 'Hierba', 'Roca'], answer: 'Árbol' },
  { question: 'What is the meaning of "Chair"?', options: ['Silla', 'Mesa', 'Cama', 'Puerta'], answer: 'Silla' },
  { question: 'What is the meaning of "Window"?', options: ['Puerta', 'Ventana', 'Techo', 'Pared'], answer: 'Ventana' },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionPress = (option) => {
    if (selectedOption !== null) return; // evitar cambiar respuesta

    setSelectedOption(option);
    const correct = option === questions[currentQuestion].answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setScore(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>

      {questions[currentQuestion].options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => handleOptionPress(option)}
          style={[
            styles.optionButton,
            selectedOption === option && (isCorrect ? styles.correctOption : styles.incorrectOption),
          ]}
          disabled={selectedOption !== null} 
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {showFeedback && (
        <Text style={[styles.feedbackText, isCorrect ? styles.correctText : styles.incorrectText]}>
          {isCorrect
            ? '¡Correcto! 🎉'
            : `Incorrecto. La respuesta correcta es: ${questions[currentQuestion].answer}`}
        </Text>
      )}

      {currentQuestion < questions.length - 1 ? (
        <TouchableOpacity
          onPress={handleNextQuestion}
          disabled={!showFeedback}
          style={[styles.button, !showFeedback && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>Siguiente pregunta</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.scoreText}>Tu puntaje es: {score} / {questions.length}</Text>
          <TouchableOpacity onPress={handleRestart} style={styles.button}>
            <Text style={styles.buttonText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  question: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#eee',
    padding: 15,
    marginVertical: 6,
    borderRadius: 8,
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  correctOption: {
    backgroundColor: '#c8e6c9',
  },
  incorrectOption: {
    backgroundColor: '#ffcdd2',
  },
  feedbackText: {
    fontSize: 20,
    marginVertical: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  correctText: {
    color: 'green',
  },
  incorrectText: {
    color: 'red',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    marginTop: 15,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
