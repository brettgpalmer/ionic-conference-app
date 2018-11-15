import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../../providers/auth.service';
import { SpeakersService } from '../../providers/speakers.service';
import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {

  public loading: HTMLIonLoadingElement;

  login: UserOptions = { username: '', password: '' };
  submitted = false;

  constructor(
    public userData: UserData,
    public router: Router,
    public authService: AuthService,
    public speakersService: SpeakersService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
    }
  }

  async importSpeakersTest() {

    this.loading = await this.loadingCtrl.create();
    await this.loading.present();

    this.speakersService.resolveAfterSeconds(100).then(
      () => {
        this.loading.dismiss().then(() => {
          console.log(`dismissing controller`);
          this.router.navigateByUrl('/survey-list');
        });
      },
      error => {
        this.loading.dismiss().then(async () => {
          const alert = await this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          await alert.present();
        });
      }
    );

  }


  async importSpeakers() {

    this.loading = await this.loadingCtrl.create();
    await this.loading.present();

    await this.speakersService.importSpeakers();

    await this.loading.dismiss().then(() => {
      console.log(`done importing speakers`);
      this.router.navigateByUrl('/survey-list');
    });

  }

  importOneSpeaker() {
    try {
      const name = 'David Lee Roth';
      const profilePic = 'assets/img/speakers/bear.jpg';
      const twitter = 'ionicframework';
      const about = 'Rockstar';
      const location = 'Los Angeles, CA';
      const email = 'droth@vanhelen.org';
      const phone = '213-222-4444';

      this.speakersService.addSpeaker(
        name,
        profilePic,
        twitter,
        about,
        location,
        email,
        phone
      ).then(() => {
          this.router.navigateByUrl('/survey-list');
      });
    } catch (error) {
        console.error(error);
    }
  }

  anonymousLogin() {
    try {
      this.authService.anonymousLogin().then(() => {
          this.router.navigateByUrl('/survey-list');
      });
    } catch (error) {
        console.error(error);
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }
}
