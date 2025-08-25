import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  imports: [],
  template: `
    <p class="message" [class]="fromUser() ? 'user-message' : 'ai-message'">{{ message() }}</p>
  `,
  host: {
    '[class.self-end]': '!fromUser()',
  },
  styleUrl: './mensagem.css'
})
export class Mensagem {
  fromUser = input<boolean>(false);
  message = input.required<string>();
}
