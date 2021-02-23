import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { asObservable } from "./asObservable";

@Injectable({
  providedIn: "root",
})
export class SpinnerService {
  private loadingStatusListener = new BehaviorSubject<boolean>(false);

  constructor() {}

  getLoadingStatusListener() {
    return this.loadingStatusListener.asObservable();
  }

  setLoadingStatusListener(isLoading: boolean): void {
    this.loadingStatusListener.next(isLoading);
  }
}
