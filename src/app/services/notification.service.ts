import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
    private isLoading = new Subject<boolean>();
    private infoString = new Subject<string>();
    private successString = new Subject<string>();
    private errorString = new Subject<string>();

    constructor() {
        this.isLoading.next(false);
    }

    info = this.infoString.asObservable();
    success = this.successString.asObservable();
    error = this.errorString.asObservable();
    loading = this.isLoading.asObservable();

    showInfo(message: string) {
        this.infoString.next(message);
    }

    showSuccess(message: string) {
        this.successString.next(message);
    }

    showError(message: string) {
        this.errorString.next(message);
    }

    showLoading() {
        this.isLoading.next(true);
    }

    hideLoading() {
        this.isLoading.next(false);
    }
}