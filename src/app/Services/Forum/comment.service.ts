import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from "../../Environments/environment";
import {User} from "../../Model/User/user";
import {catchError} from "rxjs/operators";


@Injectable({
	providedIn: 'root'
})
export class CommentService {
	private host = environment.apiUrlUser;

	constructor(private httpClient: HttpClient) { }

	likeComment(commentId: number): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}posts/comments/${commentId}/like`, null);
	}

	unlikeComment(commentId: number): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any | HttpErrorResponse>(`${this.host}posts/comments/${commentId}/unlike`, null);
	}

	deleteComment(postId: number, commentId: number): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any>(`${this.host}posts/${postId}/comments/${commentId}/delete`, null)
			.pipe(
				catchError((errorResponse: HttpErrorResponse) => {
					return throwError(errorResponse);
				})
			);
	}

	getCommentLikes(commentId: number, page: number, size: number): Observable<User[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.httpClient.get<User[] | HttpErrorResponse>(`${this.host}posts/comments/${commentId}/likes`, { params: reqParams });
	}
}
