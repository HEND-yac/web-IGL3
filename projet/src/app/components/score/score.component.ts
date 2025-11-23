import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  @Input() score = 0;
  @Input() totalQuestions = 0;
  @Input() correctAnswers = 0;

  getPercentage(): number {
    if (this.totalQuestions === 0) return 0;
    return Math.round((this.correctAnswers / this.totalQuestions) * 100);
  }

  getPerformanceMessage(): string {
    const percentage = this.getPercentage();
    if (percentage >= 80) {
      return 'Excellent travail ! Vous maîtrisez très bien le sujet.';
    } else if (percentage >= 60) {
      return 'Bon travail ! Vous avez une bonne compréhension du sujet.';
    } else {
      return 'Continuez vos efforts ! Il y a encore du travail à faire.';
    }
  }

  getPerformanceClass(): string {
    const percentage = this.getPercentage();
    if (percentage >= 80) {
      return 'excellent';
    } else if (percentage >= 60) {
      return 'good';
    } else {
      return 'poor';
    }
  }
}