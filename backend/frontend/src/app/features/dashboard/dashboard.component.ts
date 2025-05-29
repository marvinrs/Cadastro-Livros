import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../../core/services/relatorio.service';
import { Estatisticas } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  estatisticas: Estatisticas | null = null;
  loading = true;

  constructor(private relatorioService: RelatorioService) { }

  ngOnInit(): void {
    this.carregarEstatisticas();
  }

  carregarEstatisticas(): void {
    this.relatorioService.obterEstatisticas().subscribe({
      next: (data) => {
        this.estatisticas = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar estatísticas:', error);
        this.loading = false;
      }
    });
  }

  gerarRelatorio(): void {
    this.relatorioService.gerarRelatorioPDF().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio_livros_${new Date().toISOString()}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erro ao gerar relatório:', error);
      }
    });
  }
}
