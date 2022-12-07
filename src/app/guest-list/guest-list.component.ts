import { Component, OnInit } from '@angular/core';
import { GuestsDataService, Record } from '../guests-data.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.css']
})
export class GuestListComponent implements OnInit {
  public records?: Record[];
  public sortByName: boolean;
  public hideCustomerNotTakePart: boolean;

  constructor(private guestsData: GuestsDataService) {
    this.sortByName = false;
    this.hideCustomerNotTakePart = false;
  }

  public ngOnInit(): void {
    this.guestsData.getGuests(this.hideCustomerNotTakePart, this.sortByName).subscribe(data => {
      this.records = data.records;
    });
  }

  public getTotalNrOfGuests(): number {
    if (this.records) {
      let nrOfGuests: number = 0;

      for (let record of this.records!) {
        nrOfGuests += 1;

        if (record.fields.additional_guest) {
          nrOfGuests += 1;
        }
      }

      return nrOfGuests;
    }

    return -1;
  }

  public present(record: Record) {
    record.fields.present = true;
    this.guestsData.patchGuest(record).subscribe();
  }
}
