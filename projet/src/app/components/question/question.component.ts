import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  question: string;
  options: string[];
  reponse: string;
}

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  @Input() question!: Question;
  @Input() disabled = false;
  @Output() answerSelected = new EventEmitter<string>();

  selectedOption: string | null = null;

  selectOption(option: string) {
    if (!this.disabled) {
      this.selectedOption = option;
      this.answerSelected.emit(option);
    }
  }
}