import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../Environments/environment";
import {PostResponse} from "../../Model/User/post-response";
import {Tag} from "../../Model/User/tag";


@Injectable({
	providedIn: 'root'
})
export class TimelineService {
	private host = environment.apiUrlUser;

	constructor(private httpClient: HttpClient) { }

	getTimelinePosts(page: number, size: number): Observable<PostResponse[] | HttpErrorResponse> {
		const reqParams = new HttpParams().set('page', page).set('size', size);
		return this.httpClient.get<PostResponse[] | HttpErrorResponse>(`${this.host}posts`, { params: reqParams });
	}

	getTimelineTags(): Observable<Tag[] | HttpErrorResponse> {
		return this.httpClient.get<Tag[] | HttpErrorResponse>(`${this.host}tags`);
	}
}
