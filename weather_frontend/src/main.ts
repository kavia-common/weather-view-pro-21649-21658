import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Angular bootstrap entrypoint (standalone).
 * Uses Angular framework with REST calls to `/api/*`.
 */
// PUBLIC_INTERFACE
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  /**
   * This public interceptor is a placeholder to attach auth headers or
   * perform request logging. Currently it forwards the request unchanged.
   */
  return next(req);
};

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([apiInterceptor])),
    provideRouter(appRoutes),
  ]
}).catch(err => console.error(err));
