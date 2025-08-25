import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { Mensagem } from '../ui/mensagem/mensagem';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  imports: [Mensagem, ReactiveFormsModule ],
  template: `
    <div class="h-screen m-5 bg-sky-100 rounded-2xl flex flex-col p-5 gap-2">
      <div class="flex-1 flex flex-col gap-3">
        @for (message of chat(); track $index) {
          <app-mensagem [fromUser]="message.type === 'user'" [message]="message.message"></app-mensagem>
          @if (loading()) {
            <app-mensagem message="Carregando..."></app-mensagem>
          }
        }
      </div>
      <form [formGroup]="form" (ngSubmit)="sendMessage()" class="justify-self-end flex justify-between">
        <input type="text" placeholder="Escreva..." class="flex-1 w-full bg-white p-5 rounded-2xl shadow" formControlName="message" />
      </form>
    </div>

  `,
  styleUrl: './chat.css',
})
export class Chat {
  private chatService = inject(ChatService);
  chat = toSignal(this.chatService.chat$)
  form = new FormGroup({
    message: new FormControl()
  });
  loading = signal(false);

  sendMessage() {
    this.form.controls['message'].disable();
    const message = this.form.controls['message'].value;
    this.form.controls['message'].reset();
    this.loading.set(true);
    this.chatService.sendMessage(message).pipe(
      tap(() => {
        this.form.controls['message'].enable()
        this.loading.set(false);
      })
    ).subscribe({
      next: () => {
        console.log('Mensagem receibda');
      }
    })
  }
}
