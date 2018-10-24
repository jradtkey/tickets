import { Injectable } from '@angular/core';
import { Owner } from './owner.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http: HttpClient, private router: Router) { }

  private owners: Owner[] = [];
  private ownersUpdated = new Subject<Owner[]>();
  owner;
  ownerId = '';

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

  async showOwner(id) {
    this.owner = await this.http.get('http://localhost:3000/api/owners/' + id).toPromise();
    this.owner = this.owner['owner']
    this.router.navigate(['/owner/'+id]);
  }


  async createOwner(){


    // //var owners = await this.http.get('http://ancient-meadow-35207.herokuapp.com/api/ol').toPromise()
    //
    // for (let variable of owners['results']) {
    //   var name = variable.name;
    //   var replaced = name.split(' ').join('+');
    //   console.log(replaced);
    //
    //   var results = await this.http.get('http://ancient-meadow-35207.herokuapp.com/api/spf?ownername='+replaced).toPromise();
    //   // console.log(results)
    //   const owner: Owner = {
    //     id: null,
    //     name: results['ownerName'],
    //     email: null,
    //     phone: null,
    //     accountType: null,
    //     commission: results['vjFee'],
    //     properties: [results['results']]
    //   }
    //   // console.log(owner);
    //
    //   this.http.post<{message: string, owner: any}>('http://localhost:3000/api/owners', owner)
    //     .subscribe((responseData) => {
    //
    //       console.log(responseData);
    //
    //     })

    //}




  }
}
