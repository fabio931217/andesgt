import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BACK_PHP = environment.BACK_PHP;
const BACK_PY = environment.BACK_PY;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _refresh$ = new Subject<void>();
  constructor(
    private http: HttpClient,
  ) {

  }

  get refresh$() {
    return this._refresh$;
  }

  handleError(error: HttpErrorResponse): any {
    return throwError(error);
  }

  /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Metodo que lista las tareas
    * @param size y page
  */
  listar(page: number , pageSize: number, ) {
    const url = `${BACK_PY}v1/products/list?page=${page}&perPage=${pageSize}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

   /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Metodo que permite consultar un registro
    * @param id
  */
   ver(id: number) {
    const url = `${BACK_PY}v1/products/show/${id}`;
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

   /**
    * @author Fabio Garcia
    * @createdate 2024-06-27
    * Metodo que permite eliminar un elemento de la lista
    * @param id
  */
   eliminar(id: number) {
    const url = `${BACK_PY}v1/products/delete/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  /**
      * @author Fabio Garcia
      * @createdate 2024-06-27
      * Metodo que permite actualizar un registro
      * @param id y data a guardar
  */
  actualizar(id: number, data: any ) {
    const url = `${BACK_PY}v1/products/update/${id}`;
    return this.http.put(url,data)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
      * @author Fabio Garcia
      * @createdate 2024-06-27
      * Metodo que permite guardar un registro
      * @param data a guardar
  */
  guardar(data: any ) {
    const url = `${BACK_PY}v1/products/save`;
    return this.http.post(url,data)
      .pipe(
        catchError(this.handleError)
      );
  }
  

}