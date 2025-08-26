import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Chat } from './chat/chat';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  imports: [MatDialogModule, MatButtonModule, MatTableModule],
  template: `
    <div class="flex justify-center">
      <button matButton (click)="openChat()">Abrir Chat</button>
      <button matButton (click)="reloadUsers.next(null)">Recarregar</button>
    </div>
    <table mat-table [dataSource]="users$()!">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Nome</th>
        <td mat-cell *matCellDef="let name">{{ name }}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="['name']"></tr>
      <tr mat-row *matRowDef="let row; columns: ['name']"></tr>
    </table>
  `,
  styleUrl: './app.css',
})
export class App {
  private readonly dialog = inject(MatDialog);
  private readonly usersService = inject(UsersService);
  protected readonly title = signal('angular-agentic-app');

  reloadUsers = new BehaviorSubject(null);
  users$ = toSignal(this.reloadUsers.pipe(switchMap(() => this.usersService.getUsers())));

  openChat() {
    this.dialog.open(Chat, { width: '60%', minWidth: '300px', height: '80%', minHeight: '500px' });
  }
}
