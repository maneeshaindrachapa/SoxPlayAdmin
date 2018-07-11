import { Component, OnInit } from '@angular/core';
import { User,Email } from "../../../services/sdk/models";
import { UserApi,EmailApi } from '../../../services/sdk/services/custom';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  rows = [];
  columns = [
    {prop: 'id', name: 'ID'},
    {prop: 'fullname', name: 'Full Name'},
    {prop: 'contact', name: 'Contact'},
    {prop: 'email', name: 'E-mail'},
  ];

  selected = [];
  emailList=[];
  email__:string='';
  subject__:string='';
  user=new User();
  email=new Email();

  ckeditorContent: string = '<p>Email Body</p>';
  constructor(private userApi:UserApi,private emailApi:EmailApi) { }

  ngOnInit() {
    this.userApi.find().subscribe(data => {
      this.rows = data;
    });
  }
  
  onActivate(event) {
   // console.log('Activate Event', event);
  }

  selectUser({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  addEmail(id,email){
    console.log(this.emailList);
    let tempUser=[];
    tempUser.push(id);
    tempUser.push(email);

    let b:boolean=true;
    for(let i=0;i<this.emailList.length;i++){
      if(this.emailList[i][0]==tempUser[0]){
        //already on list
        b=false;
      }
    }
    if(b){
      this.emailList.push(tempUser);
    }
  }
  removeEmail(obj){
    const index: number = this.emailList.indexOf(obj);
    if (index !== -1) {
        this.emailList.splice(index, 1);
    }  
  }
  sendEmail(){
    for(let i=0;i<this.emailList.length-1;i++){
      this.email__+=this.emailList[i][1]+",";
    }
    this.email__+=this.emailList[this.emailList.length-1][1];
    this.email.from="soxplaydev@gmail.com";
    this.email.to=this.email__;
    this.email.subject=this.subject__;
    this.email.html=this.ckeditorContent.substring(0,this.ckeditorContent.length-1);
    console.log("\""+JSON.stringify(this.email)+"\"");
    this.emailApi.sendEmail("\""+JSON.stringify(this.email)+"\"").subscribe(res=>{
      Swal("Email Sent!", "Your Email sent Successfully", "success");
    },error=>{
      Swal("Server Error!", "Please try again later", "error");
      console.log(error);
    });
    this.emailList=[];
    this.email__="";
  }
  
}
