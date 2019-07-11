import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, skipUntil } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SoftwareService {

  constructor(private http:HttpClient) { }

  //get all softwares
  public getAllSoftware(top:number,skip:number):Observable<Software[]>{
    return this.http.get<Software[]>(`http://localhost:64646/api/Software?$top=${top}&$skip=${skip}`,{
      headers:new HttpHeaders({
        Accept:"application/json"
      })
    })
  }

    //get search results
    public getSoftwareByName(name:string,top:number,skip:number):Observable<Software[]>{
  
      return this.http.get<Software[]>(`http://localhost:64646/api/Software?name=${name}&$top=${top}&$skip=${skip}`,{
        headers:new HttpHeaders({
          Accept:"application/json"
        })
      })
  
      
    }

    public getMachineVersion(id:number):Observable<MachineVersion[]>{

      return this.http.get<MachineVersion[]>(`http://localhost:64646/api/Software?id=${id}`,{
        headers:new HttpHeaders({
          Accept:"application/json"
        })
      })
  
      
    }




}





export interface MachineVersion{
  ComputerName:string
  Version:string
}


  //Software Interface
export interface Software {
  SoftwareId:number,
  SoftwareName:string
}