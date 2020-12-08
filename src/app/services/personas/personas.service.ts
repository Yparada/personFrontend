import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  private API_SERVER= "http://localhost:8080/personas/";

  constructor(private httpClient: HttpClient) { }

  public getAllPersonas(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public detail(id): Observable<any>{
    return this.httpClient.get(this.API_SERVER + id);
  }

  public savePersona(persona: any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, persona);
  }

  public deletePersona(id): Observable<any>{
    return this.httpClient.delete(this.API_SERVER + id);
  }

  public updatePersona(id, persona): Observable<any>{
    return this.httpClient.put(this.API_SERVER + id, persona);
  }
}
