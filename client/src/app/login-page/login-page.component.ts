import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  aSub: Subscription;

  constructor(private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) {

               }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params:Params)=>{
      if (params['registerd']) {
        //теперь вы можете войти в систему, используя свои данные
      } else if (params['accessDenied']) {
        //Для начала авторизуйтесь в системе
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub){
    this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable();
    const user = {
      email:this.form.value.email,
      password: this.form.value.password
    }
    this.aSub = this.auth.login(user).subscribe(
      () => this.router.navigate(['/overview']),
      error => {console.warn(error)
      this.form.enable()
      }
    )
  }
}