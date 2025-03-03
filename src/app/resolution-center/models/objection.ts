import { getLocaleDateTimeFormat } from "@angular/common";
import * as moment from "moment";
import { Observable } from "rxjs";
export class Objection {
  id: number;
  comment: string;
  createdAt: Date;
  submittedByUser: {
    id: number;
    units: { addressLineOne: string }[];
  };
  submittedAgainstUser: {
    id: number;
    units: { addressLineOne: string }[];
  };
  result: boolean | null;
  closedAt: Date | null;
  closesAt: Date;
  votes: {
    objection_id: number;
  }[] | null;

  // TODO: show user how much time is left to vote
  // timeLeftToVote() {
  //   var objectionExpires = moment(this.createdAt).add(24, 'hours');
  //   var now = moment();
  //   var timeLeftToVote = moment().duration(objectionExpires.diff(now));
  //   if(now < objectionExpires) {
  //     const countDown = new Observable(subscriber => {
  //       setInterval(() => {subscriber.next(moment.)}}
  //   }
  // }
}
