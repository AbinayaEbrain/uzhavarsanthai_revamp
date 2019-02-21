import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  public blogUserData = {}
  constructor(private _auth:AuthService) { }

  ngOnInit() {

  }
post(){
  console.log(this.blogUserData);

}
}
