import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResolutionCenterService {
  constructor(private http: HttpClient) {}

  public getInbox(): Observable<{ objections: any[] }> {
    return this.http.get<{ objections: any[] }>('/api/inbox');
  }

  public getUnits(): Observable<{ units: any[] }> {
    return this.http.get<{ units: any[] }>('/api/units');
  }
  public submitObjection(objection) {
    return this.http.post('/api/objections', { objection });
  }

  public submitVote(vote) {
    return this.http.post('/api/vote', { vote });
  }

  public getOutbox(): Observable<{ objections: any[] }> {
    return this.http.get<{ objections: any[] }>('/api/outbox');
  }

  public getObjection(id) {
    return this.http.get('/api/objections/' + id);
  }

  public getPastObjections(): Observable<{ objections: any[] }>  {
    return this.http.get<{ objections: any[] }>('/api/objections/past');
  }
}
