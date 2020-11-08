import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Clientes } from "../models/clientes";

@Injectable({
  providedIn: "root"
})
export class ClientesService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    // la barra al final del resourse url es importante para los metodos que concatenan el id del recurso (GetById, Put)
    //this.resourceUrl = "https://pavii.ddns.net/api/articulos/";
    this.resourceUrl = "https://demo3151356.mockable.io/clientes";
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj: Clientes) {
    return this.httpClient.post(this.resourceUrl, obj);
  }
}
