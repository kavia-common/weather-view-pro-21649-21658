import { Injectable, signal } from '@angular/core';

@Injectable()
export class AuthService {
  private _user = signal<{ id: string; email: string } | null>(null);

  // PUBLIC_INTERFACE
  user() {
    /** Returns current authenticated user or null. */
    return this._user();
  }

  // PUBLIC_INTERFACE
  async login(email: string, password: string) {
    /** Placeholder login method. Should call backend auth later. */
    this._user.set({ id: 'demo', email });
  }

  // PUBLIC_INTERFACE
  async logout() {
    /** Placeholder logout method. Clears local user. */
    this._user.set(null);
  }
}
