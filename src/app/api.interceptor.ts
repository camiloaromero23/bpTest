import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoadingService } from './loading.service';

const apiURL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

export const APIInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const loadingService = inject(LoadingService);
  const apiReq = req.clone({ url: `${apiURL}${req.url}` });
  loadingService.setLoadingState(true);

  return next(apiReq).pipe(
    finalize(() => {
      loadingService.setLoadingState(false);
    }),
  );
};
