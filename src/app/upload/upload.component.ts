import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { config } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  file :any;
  fname ='';
  fformat='';
  formdata:any;
  periodicity= "6";
  showbutton = true;

  constructor(private snackbar:MatSnackBar,
              private http:HttpClient,
              private route:Router) { }

  ngOnInit(): void {
  }

  select_file(event : any){
    try{
      this.file = event.target.files[0];
      if(this.file){
        this.fname = this.file.name;
        this.fformat = this.file.type;
        if(this.fformat=='text/csv'){
          this.formdata= new FormData();
          this.formdata.append('dataset', this.file);
        }
        else{
          this.snackbar.open("Please select a CSV file","Got it" ,{duration :3000});
          this.deletefile();
        }
      }
      console.log(this);    
    }
    catch(err){
      console.log(err);
    }
  }
  add_period(){
    this.formdata.delete("period");
    this.formdata.append('period', this.periodicity);
  }
  deletefile(){
    this.fname='';
    this.fformat='';
    this.file=null;
    this.formdata.delete("dataset");
    console.log(this);
  }

  predict(){
    if(this.file){
      this.showbutton=false;
      let api_url = "http://127.0.0.1:5000/api/predict";
      this.http.post(api_url,this.formdata,{responseType:"text"}).subscribe((res)=>{
          console.log(res);
          this.showbutton=true;  
          this.route.navigate(['result']);
      });
    }
    else{
      this.snackbar.open("Please select a file","Okay",{duration:3000});
    }
  }

}
