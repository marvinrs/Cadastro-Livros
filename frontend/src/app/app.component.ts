import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'Sistema de Cadastro de Livros';
  sidenavOpened = true;

  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'book', label: 'Livros', route: '/livros' },
    { icon: 'person', label: 'Autores', route: '/autores' },
    { icon: 'category', label: 'Assuntos', route: '/assuntos' },
    { icon: 'assessment', label: 'Relatórios', route: '/relatorios' }
  ];

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
}
