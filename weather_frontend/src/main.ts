import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Angular bootstrap entrypoint (standalone).
 * Note: This project uses Angular, not Next.js. Any previous references were removed.
 * Simple interceptor placeholder (e.g., attach auth token later)
 */
// PUBLIC_INTERFACE
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  // Example: attach auth header when available
  return next(req);
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideRouter(appRoutes),
  ]
}).catch(err => console.error(err));
