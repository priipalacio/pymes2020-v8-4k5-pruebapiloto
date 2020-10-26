import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";

@Injectable()
export class ServiciosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    // la barra al final del resourse url es importante para los metodos que concatenan el id del recurso (GetById, Put)
    //this.resourceUrl = "https://pavii.ddns.net/api/articulos/";
    this.resourceUrl = "https://pavii.duckdns.org/api/servicios";
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }
}
