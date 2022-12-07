import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = '<URL>';
const TOKEN = '<TOKEN>';

export interface Guest {
  name: string,
  takes_part: boolean,
  notes: string,
  additional_guest: boolean,
  additional_guest_name: string,
  present: boolean,
}

export interface Record {
  createdTime: Date,
  fields: Guest,
  id: String,
}

export interface Root {
  records: Record[]
}

@Injectable({
  providedIn: 'root'
})
export class GuestsDataService {

  constructor(private http: HttpClient) { }

  public getGuests(hideGuestNotTakePart: boolean, sortByName: boolean): Observable<Root> {
    let url = URL;
    if (hideGuestNotTakePart && sortByName) {
      url += `?filterByFormula=takes_part&sort%5B0%5D%5Bfield%5D=name&sort%5B0%5D%5Bdirection%5D=asc`;
    } else if (hideGuestNotTakePart) {
      url += `?filterByFormula=takes_part`;
    } else if (sortByName) {
      url += `?sort%5B0%5D%5Bfield%5D=name&sort%5B0%5D%5Bdirection%5D=asc`;
    }

    return this.http.get<Root>(url, {
      headers: new HttpHeaders({
        Authorization: TOKEN
      })
    });
  }

  public postGuest(guest: Guest): Observable<Root> {
    return this.http.post<Root>(URL, {
      records: [
        {
          fields: guest
        }
      ]
    }, {
      headers: new HttpHeaders({
        Authorization: TOKEN
      })
    });
  }

  public patchGuest(record: Record): Observable<Record> {
    return this.http.patch<Record>(`${URL}/${record.id}`, {
      fields: record.fields
    }, {
      headers: new HttpHeaders({
        Authorization: TOKEN
      })
    });
  }
}
