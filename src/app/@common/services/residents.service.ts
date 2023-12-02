import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Resident } from '../models/residents/resident.model';

@Injectable({
  providedIn: 'root',
})
export class ResidentsService {
  private readonly residentUrl = `${environment.urbanUrl}/api/Cabinet/Residents`;

  constructor(private http: HttpClient) {}

  public findAll(search: string) {
    search = search.trim();
    const options = search
      ? { params: new HttpParams().set('search', search) }
      : {};

    return this.http.get<Resident[]>(this.residentUrl, options);
  }
}
