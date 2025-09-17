import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  query = '';
  @Output() search = new EventEmitter<string>();

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.query.trim().length) {
      this.search.emit(this.query.trim());
    }
  }
}
