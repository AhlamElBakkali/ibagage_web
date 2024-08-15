import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { AppService } from "./app.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  appService?: AppService;
  constructor(private injector: Injector) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = sessionStorage.getItem("token");
    const authUser = localStorage.getItem("user");
    if (authToken && authUser) {
      req = req.clone({
        setHeaders: {
          Authorization: "Bearer " + authToken,
          User: authUser,
        },
      });
    } 
    return next.handle(req);
  }
}
