import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  file :any;
  fname ='';
  fformat='';
  formfile:any;
  

  constructor(private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }

  select_file(event : any){
    try{
      this.file = event.target.files[0];
      if(this.file){
        this.fname = this.file.name;
        this.fformat = this.file.type;
        if(this.fformat=='text/csv'){
          this.formfile= new FormData();
          this.formfile.append('file', this.file);
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

  deletefile(){
    this.fname='';
    this.fformat='';
    this.file=null;
    // this.formfile.delete("file");
    console.log(this);
  }

}
