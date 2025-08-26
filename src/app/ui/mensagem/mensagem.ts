import { Component, input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mensagem',
  imports: [],
  template: `
    <p class="message" [class]="fromUser() ? 'user-message' : 'ai-message'">
      {{ message() }}
    </p>
  `,
  host: {
    '[class.self-end]': '!fromUser()',
  },
  styleUrl: './mensagem.css',
})
export class Mensagem implements OnChanges {
  fromUser = input<boolean>(false);
  message = input<string>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
