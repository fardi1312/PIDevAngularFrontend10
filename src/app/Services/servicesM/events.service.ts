import { Injectable } from '@angular/core';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { Events } from 'src/app/models/modelM/Events';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/modelM/Comment';
import { EventRequest } from 'src/app/models/modelM/EventRequest';

@Injectable({
    providedIn: 'root'
  })

export class EventsService {

    private apiUrl = 'http://localhost:8083/tfou';

    constructor(private http: HttpClient) { }

    public modalStatus: boolean = false;

    private badWords: string[] = ['ass', 'arse', 'asshole', 'bastard', 'bitch', 'bollocks', 'bugger', 'cock', 'crap', 'cunt', 
    'damn', 'dick', 'douche', 'fanny', 'fuck', 'motherfucker', 'piss', 'prick', 'shit', 'slut', 'tits', 'twat', 'wanker', 'whore', 'putain', 'merde', 'foutre', 'salaud', 'connard', 'bite', 'chatte', 'enculé', 'enculée', 'niaiseux', 'criss', 'ostie', 'idiot', 'moron', 'jackass', 'douchebag', 'loser', 'dumbass', 'schmuck', 'bellend', 'git', 
    'tosser', 'muppet', 'numbnuts', 'knobhead', 'cockwomble', 'shithead', 'arsewipe', 'prat','cockhead', 'dipshit', 'twatwaffle', 'fudgepacker', 'assclown', 'fuckwit', 'wankstain', 'bullshit', 'arsehole', 'pissant', 'dickhead', 'buttface', 'fuckface', 'pussy', 'cockroach', 
    'motherlicker', 'suckit', 'cockholster', 'dickbag', 'ballsack', 'twatburger', 'cumstain','sacristi', 'estie', 'osti', 'saint-ciboire', 'tabarnak', 'viarge', 'maudit','zab', 'zebi', 'zabour', 'zok']
    
  
    openModal(): void {
      this.modalStatus = true;

    }
  
    closeModal(): void {
      this.modalStatus = false;
    }
  
    getModalStatus(): boolean {
      return this.modalStatus;
    }
    addEvent(userId: number, newEvent: Events): Observable<Events> {

      console.log("ffff",newEvent)
        return this.http.post<Events>(`${this.apiUrl}/addEvent/${userId}`, newEvent);
      }
      

      getAllEvents(): Observable<Events[]> {
        return this.http.get<Events[]>(`${this.apiUrl}/events`);
    }

    getAllActifEvents(): Observable<Events[]> {
      return this.http.get<Events[]>(`${this.apiUrl}/Actifevents`);
  }

    participate( EventId: number) :Observable<EventRequest> {
      return this.http.post<EventRequest>(`${this.apiUrl}/participate/${EventId}`, null);}
     
      getEventById( EventId: number) : Observable<Events>{
        return this.http.get<Events>(`${this.apiUrl}/getEventById/${EventId}`);
      }

      getCommentsByEvent(eventId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.apiUrl}/event/${eventId}`);
      }
      
      getAllComments(): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.apiUrl}/comments`);
    }
      
    createComment(comment: Comment, eventId: number, userId: number): Observable<Comment> {
      return this.http.post<Comment>(`${this.apiUrl}/addComment/${eventId}/${userId}`, comment);
    }

    deleteComment(id: number): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/DeleteComment/${id}`, null);
    }

    sanitizeText(text: string): string {
      // Replace bad words with stars
      for (const word of this.badWords) {
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        text = text.replace(regex, '*'.repeat(word.length));
      }
      return text;
    }
      
    addLike(idU: number, idE :number ): Observable<void> {
      return this.http.post<void>(`${this.apiUrl}/addLike/${idU}/${idE}`, null);
    }

    getLikesCount(eventId: number): Observable<number> {
      return this.http.get<number>(`${this.apiUrl}/likesCount/${eventId}`);
    }

    islikedOrnot(idU: number, idE: number): Observable<number> {
      return this.http.get<number>(`${this.apiUrl}/isLiked/${idU}/${idE}`);
    }

    getEventsPerMonth(): Observable<{ [key: string]: number }> {
      return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/eventsPerMonth`);
    }

    getCategoryPercentages(): Observable<number[]> {
      return this.http.get<number[]>(`${this.apiUrl}/categoryPercentages`);
    }

    getMonthlyProfits(): Observable<{ [key: string]: number }> {
      return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/profits`);
    }
}