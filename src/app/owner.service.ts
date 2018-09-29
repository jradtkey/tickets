import { Injectable } from '@angular/core';
import { Owner } from './owner.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient) { }

  private owners: Owner[] = [];
  private ownersUpdated = new Subject<Owner[]>();

  getOwners(){
    this.http.get<{message: string, owners: any}>('http://localhost:3000/api/owners')
      .pipe(map((ownerData) => {
        return ownerData.owners.map(owner => {
          return {
            id: owner._id,
            name: owner.name,
            email: owner.email,
            phone: owner.phone,
            accountType: owner.accountType,
            commission: owner.commission,
            properties: owner.properties
          }
        })
      }))
      .subscribe(transformedOwners => {
        this.owners = transformedOwners;
        this.ownersUpdated.next([...this.owners]);
      })
  }

  getOwnerUpdateListener(){
    return this.ownersUpdated.asObservable();
  }

  createOwner(){

    const owner: Owner = {
      id: null,
      name: "Alan Nash",
      email: "alan@medxfirst.com",
      phone: "(617) 510-1334",
      accountType: "StandardVR Marketing",
      commission: 10
    };

    this.http.post<{message: string, owner: any}>('http://localhost:3000/api/owners', owner)
      .subscribe((responseData) => {
        const owner = responseData.owner;
        console.log(responseData)
      })
  }
}
