import { Component, OnInit } from '@angular/core';
import { Message } from '../Model/Message/Message';
import { MessageService } from '../message.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { UserService } from '../Services/User/UserService';

@Component({
  selector: 'app-message',
  templateUrl: './messageamira.component.html',
  styleUrls: ['./messageamira.component.css']
})
export class MessageamiraComponent implements OnInit {
  messages: Message[] = [];
  newMessage: Message = { sender: '', content: '', timestamp: new Date() };
  errorMessage: string = '';
  currentUser: string = '';

  constructor(private messageService: MessageService, private userService: UserService) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.loadMessages();
  }

  getCurrentUser(): void {
    this.userService.getAuthenticatedUser().subscribe(
      (user) => {
        this.currentUser = user.username;
      },
      (error) => {
        console.error('Error fetching authenticated user:', error);
      }
    );
  }

  loadMessages(): void {
    this.messageService.getAllMessages()
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to load messages.';
          return throwError(error);
        })
      )
      .subscribe(messages => {
        this.messages = messages;
      });
  }

  createMessage(): void {
    if (!this.newMessage.content) {
      this.errorMessage = 'Content is required.';
      return;
    }

    // Set sender to current user's username
    this.newMessage.sender = this.currentUser;

    this.messageService.createMessage(this.newMessage)
      .pipe(
        catchError(error => {
          this.errorMessage = 'Failed to create message.';
          return throwError(error);
        })
      )
      .subscribe(() => {
        this.loadMessages();
        this.resetForm();
      });
  }

  resetForm(): void {
    this.newMessage = { sender: this.currentUser, content: '', timestamp: new Date() };
    this.errorMessage = '';
  }
}
