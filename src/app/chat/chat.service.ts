import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ModelMessage } from 'ai';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';
  private chatMessages = new BehaviorSubject<ModelMessage[]>([]);
  chat$ = this.chatMessages.asObservable();

  sendMessage(message: string) {
    this.chatMessages.next([
      ...this.chatMessages.value,
      {
        role: 'user',
        content: message,
      },
    ]);
    return this.http
      .post<ModelMessage>(`${this.url}/ai/message`, {
        messages: this.chatMessages.value,
      })
      .pipe(
        tap((response) => {
          this.chatMessages.next([...this.chatMessages.value, response]);
        })
      );
  }
}