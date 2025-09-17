import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.page.html'
  // Removed missing SCSS file reference to fix build error.
})
export class ProfilePageComponent {}
