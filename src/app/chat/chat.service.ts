import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, tap } from 'rxjs';

type ChatType = {
  type: 'user' | 'system';
  message: string
};

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private http = inject(HttpClient);
  private url = 'http://localhost:3000';
  private chatMessages = new BehaviorSubject<ChatType[]>([])
  chat$ = this.chatMessages.asObservable();


  sendMessage(message: string) {
    this.chatMessages.next([
      ...this.chatMessages.value,
      {
      type: 'user',
      message,
    }]);
    return this.http.post<ChatType>(`${this.url}/ai/message`, {
      message
    }).pipe(
      tap((response) => {
        this.chatMessages.next([
          ...this.chatMessages.value,
          response
        ])
      })
    )
  }
}