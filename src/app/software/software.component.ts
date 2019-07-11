import { Component, OnInit } from '@angular/core';
import { SoftwareService, Software,MachineVersion } from '../software.service';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {
  SoftwareName=""
  searchStr="";
  top=10;
  skip=0;
  SoftwareList:Software[]=[];
  MachineVersionList:MachineVersion[]=[]

  constructor(private s : SoftwareService) { }
  ngOnInit() {
    this.s.getAllSoftware(this.top,this.skip).subscribe(
      data=>{
        this.SoftwareList=data
        console.log(data)}
      )
  }

  //handling click on next button
  handleNext(){
    this.skip=this.skip+10;
if(this.searchStr){

  this.s.getSoftwareByName(this.searchStr,this.top,this.skip).subscribe(data=>this.SoftwareList=data)

}
    else{
      this.s.getAllSoftware(this.top,this.skip).subscribe(
        data=>{
          this.SoftwareList=data
        }
      )
    }

  }

  //handling click on previous button
  handlePrevious(){
    this.skip=this.skip-10;
    if(this.searchStr){
      //this works when searchmode is on
      this.s.getSoftwareByName(this.searchStr,this.top,this.skip).subscribe(data=>this.SoftwareList=data)
    }
else{
  this.s.getAllSoftware(this.top,this.skip).subscribe(
    data=>{
      this.SoftwareList=data
    }
  )

}
  }

      //function to retrieve searchstring 
       handleSearchString(event:{target:HTMLInputElement}):void{
      this.searchStr=event.target.value;
    
      }

      //function for searching
      filterSearch(){
        if(this.searchStr){
          this.skip=0;
       this.s.getSoftwareByName(this.searchStr,this.top,this.skip).subscribe(data=>{this.SoftwareList=data;});
       }
       else{
         this.skip=0;
        this.s.getAllSoftware(this.top,this.skip).subscribe(
          data=>{
            this.SoftwareList=data
          }
        )

       }
      }

 getMachines(e:Software) :void{
this.SoftwareName=e.SoftwareName;
this.s.getMachineVersion(e.SoftwareId).subscribe(data=>this.MachineVersionList=data);
 }    



}
