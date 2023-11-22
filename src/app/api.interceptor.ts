import {
    HttpHandlerFn,
    HttpInterceptorFn,
    HttpRequest
} from '@angular/common/http';

const apiURL =
  'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';

export const APIInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
) => {
  const apiReq = req.clone({ url: `${apiURL}${req.url}` });
  return next(apiReq);
};
