import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import {
  AngularFireStorage,
  AngularFireStorageReference } from '@angular/fire/storage';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {

  public speakerList: AngularFirestoreCollection<any>;
  public userId: string;

  constructor(
    public http: HttpClient,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private afStorage: AngularFireStorage
  ) {

    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.speakerList = this.firestore.collection(`/speakerList`);
    });
  }

  getSpeakerList(): AngularFirestoreCollection<any> {
    return this.speakerList;
  }

  async addSpeaker(
    name: string,
    profilePic: string,
    twitter: string,
    about: string,
    location: string,
    email: string,
    phone: string,
  ): Promise<any> {
    const newSpeakerRef: firebase.firestore.DocumentReference = await this.speakerList.add({});

    return newSpeakerRef.update({
      name,
      profilePic,
      twitter,
      about,
      location,
      email,
      phone,
      id: newSpeakerRef.id,
    });
  }

  /* Run through list of speaker data and add to FB */

  resolveAfterSeconds(x): Promise<any> {
    return new Promise( resolve => {
      setTimeout(() => {
        resolve(x);
      }, 2000);
    });
  }

  getValueWithPromise() {
    this.resolveAfterSeconds(20).then( value => {
      console.log(`promise result: ${value}`);
    });
    console.log(`I will not wait until promise is resolved`);
  }

  //async mandatory if using 'await' keyword
  async getValueWithAsync() {
    const value = <number> await this.resolveAfterSeconds(30);
    console.log(`async result: ${value}`);
  }

  /*importSpeakers(): Promise<any> {

    return this.http
      .get('assets/data/speaker_data.json')
      .pipe(map(this.processData, this));
  } */

  processData(data: any) {

    data.speakers.forEach(( speaker: any) => {

      try {
        this.addSpeaker(
          speaker.name,
          speaker.profilePic,
          speaker.twitter,
          speaker.about,
          speaker.location,
          speaker.email,
          speaker.phone)
          .then(() => {
            console.log( data );
          });
      } catch (error) {
        console.error(error);
      }
    });
  }
/*
  "name": "Burt Bear",
  "profilePic": "assets/img/speakers/bear.jpg",
  "twitter": "ionicframework",
  "about": "Burt is a Bear.",
  "location": "Everywhere",
  "email": "burt@example.com",
  "phone": "+1-541-754-3010",
  "id": "1"
*/

}
