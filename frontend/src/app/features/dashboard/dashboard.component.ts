import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = {
    livros: 0,
    autores: 0,
    assuntos: 0,
    valorTotal: 'R$ 0,00'
  };

  constructor() { }

  ngOnInit(): void {
    // TODO: Carregar estatísticas da API
  }
}
