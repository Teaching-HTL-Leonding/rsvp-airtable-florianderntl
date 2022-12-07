import { Component, OnInit } from '@angular/core';
import { Guest, GuestsDataService } from '../guests-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public guest!: Guest;
  public submitted: boolean;

  constructor(private guestsData: GuestsDataService) {
    this.submitted = false;
    this.reset();
  }
  
  public reset() {
    this.guest = { name: '', takes_part: false, notes: '', additional_guest: false, additional_guest_name: '', present: false };
  }

  public submit() {
    this.guestsData.postGuest(this.guest).subscribe(_ => {
      this.submitted = true;
      this.reset();
    });
  }
}
