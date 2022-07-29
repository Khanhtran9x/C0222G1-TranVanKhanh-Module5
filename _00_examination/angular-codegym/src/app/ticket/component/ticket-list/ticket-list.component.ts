import {Component, OnInit} from '@angular/core';
import {Ticket} from '../../model/ticket';
import {TicketService} from '../../service/ticket.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  page = 1;
  totalItems: any;
  itemsPerPage = 4;
  tickets: Ticket[];
  ticket: Ticket;
  startPointSearch = '';
  endPointSearch = '';
  startDateSearch = '';
  endDateSearch = '';
  startPointConfirm = '';
  endPointConfirm = '';
  hourConfirm = '';
  startDateConfirm = '';

  constructor(private ticketService: TicketService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.ticketService.getAll(0).subscribe((tickets: any) => {
      this.tickets = tickets.content;
    });
  }

  getPage(page) {
    this.page = page;
    page = page - 1;
    this.ticketService.getAll(page).subscribe(tickets => {
      this.tickets = tickets;
    });
  }

  getTicketInfo(ticket: Ticket) {
    this.ticket = ticket;
    this.startPointConfirm = ticket.startPoint;
    this.endPointConfirm = ticket.endPoint;
    this.hourConfirm = ticket.startHour;
    this.startDateConfirm = ticket.startDate;
  }

  book() {
    if (this.ticket.number === 0) {
      this.toastr.warning('Sold out!', 'Ticket');
    } else {
      this.ticket.number -= 1;
      console.log(this.ticket);
      this.ticketService.updateTicket(this.ticket.id, this.ticket).subscribe(res => {
        this.getAll();
        this.toastr.success('Booked successfully!', 'Ticket');
      });
    }
  }

  search() {
    this.ticketService.search(this.startPointSearch, this.endPointSearch,
      this.startDateSearch, this.endDateSearch).subscribe((tickets: any) => {
      this.tickets = tickets.content;
      this.page = 1;
    });
  }

  delete() {
    this.ticketService.delete(this.ticket.id).subscribe(res => {
      this.getAll();
      this.toastr.success('Deleted successfully!', 'Ticket');
    });
  }
}
