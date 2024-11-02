import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { OPEN_WEATHER_API_KEY } from 'src/secrets';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (req.url.startsWith('http')) {
    const key = OPEN_WEATHER_API_KEY;
    const updatedRequest = req.clone({
      url: req.urlWithParams + '&appid=' + key,
    });
    return next(updatedRequest);
  }
  return next(req);
};
