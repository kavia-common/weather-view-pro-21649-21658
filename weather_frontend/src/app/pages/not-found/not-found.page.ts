import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="card" style="padding:16px;"><h2 style="margin:0;">Page not found</h2></div>`
})
export class NotFoundPageComponent {}
