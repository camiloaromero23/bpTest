// loading-spinner.component.ts
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent implements OnInit {
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.getLoadingState().subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }
}
