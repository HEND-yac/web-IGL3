import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuestionComponent } from '../question/question.component';
import { ScoreComponent } from '../score/score.component';

interface Question {
  question: string;
  options: string[];
  reponse: string;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, FormsModule, QuestionComponent, ScoreComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit, OnDestroy {
  questions: Question[] = [
    {
      question: 'Quel est le plus grand océan du monde ?',
      options: ['Pacifique', 'Atlantique', 'Indien', 'Arctique'],
      reponse: 'Pacifique'
    },
    {
      question: 'Quelle est la capitale de l\'Algérie ?',
      options: ['Alger', 'Tunis', 'Tanger'],
      reponse: 'Alger'
    },
    {
      question: 'Quelle est la couleur du ciel par temps clair ?',
      options: ['Bleu', 'Vert', 'Rouge'],
      reponse: 'Bleu'
    }
  ];

  currentQuestionIndex = 0;
  score = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  questionAnswered = false;
  lastAnswerCorrect = false;
  userAnswer = '';
  
  // Timer functionality
  timerEnabled = true;
  questionTime = 15; // 15 seconds per question
  timeLeft = this.questionTime;
  timerInterval: any;

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  onAnswerSelected(selectedOption: string) {
    if (!this.questionAnswered) {
      this.checkAnswer(selectedOption);
    }
  }

  submitAnswer() {
    if (!this.questionAnswered && this.userAnswer.trim()) {
      this.checkAnswer(this.userAnswer.trim());
    }
  }

  private checkAnswer(answer: string) {
    this.questionAnswered = true;
    this.stopTimer();
    
    const correct = answer.toLowerCase() === this.questions[this.currentQuestionIndex].reponse.toLowerCase();
    this.lastAnswerCorrect = correct;
    
    if (correct) {
      this.score += 10;
      this.correctAnswers++;
    } else {
      this.score = Math.max(0, this.score - 5);
      this.incorrectAnswers++;
    }
  }

  nextQuestion() {
    this.currentQuestionIndex++;
    this.questionAnswered = false;
    this.userAnswer = '';
    this.timeLeft = this.questionTime;
    
    if (this.currentQuestionIndex < this.questions.length) {
      this.startTimer();
    }
  }

  private startTimer() {
    if (!this.timerEnabled) return;
    
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.timeUp();
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private timeUp() {
    if (!this.questionAnswered) {
      this.checkAnswer(''); // Empty answer counts as incorrect
    }
  }
}