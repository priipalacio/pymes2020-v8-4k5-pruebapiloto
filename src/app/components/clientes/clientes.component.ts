import { Component, OnInit } from "@angular/core";
import { Clientes } from "../../models/clientes";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogService } from "../../services/modal-dialog.service";
import { ClientesService } from "../../services/clientes.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {
  Titulo = "Clientes";
  TituloAccionABMC = {
    A: "(Agregar)",
    C: "(Consultar)",
    L: "(Listado)"
  };
  AccionABMC = "L"; // inicialmente inicia en el listado de articulos (buscar con parametros)
  Mensajes = {
    SD: " No se encontraron registros...",
    RD: " Revisar los datos ingresados..."
  };

  Lista: Clientes[] = [];
  RegistrosTotal: number;
  SinBusquedasRealizadas = true;

  Pagina = 1; // inicia pagina 1

  // opciones del combo activo
  OpcionesTrabaja = [
    { Id: null, Nombre: "" },
    { Id: true, Nombre: "SI" },
    { Id: false, Nombre: "NO" }
  ];

  FormFiltro: FormGroup;
  FormReg: FormGroup;
  submitted = false;

  constructor(
    public formBuilder: FormBuilder,
    private modalDialogService: ModalDialogService,
    private clientesService: ClientesService
  ) {}

  ngOnInit() {
    this.FormFiltro = this.formBuilder.group({
      Nombre: [""],
      NumeroDocumento: [null],
      TieneTrabajo: [null]
    });
    this.FormReg = this.formBuilder.group({
      IdCliente: [0],
      Nombre: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(55)]
      ],
      NumeroDocumento: [
        null,
        [Validators.required, Validators.pattern("[0-9]{1,7}")]
      ],
      TieneTrabajo: [true]
    });

    this.GetClientes();
  }

  GetClientes() {
    this.clientesService.get().subscribe((res: Clientes[]) => {
      this.Lista = res;
    });
  }

  Agregar() {
    this.AccionABMC = "A";
    this.FormReg.reset();
    this.submitted = false;
    //this.FormReg.markAsPristine();
    this.FormReg.markAsUntouched();
  }

  //Buscar segun los filtros, establecidos en FormReg
  Buscar() {
    this.SinBusquedasRealizadas = false;
    this.clientesService.get().subscribe((res: any) => {
      this.Lista = res.Lista;
      this.RegistrosTotal = res.RegistrosTotal;
    });
  }

  // grabar tanto altas como modificaciones
  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
    if (this.FormReg.invalid) {
      return;
    }

    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

    // agregar post
    if (itemCopy.IdCliente == 0 || itemCopy.IdCliente == null) {
      itemCopy.IdCliente = 0;
      this.clientesService.post(itemCopy).subscribe((res: any) => {
        this.Volver();
        this.modalDialogService.Alert("Registro agregado correctamente.");
        this.Buscar();
      });
    } else {
    }
  }
  // Volver desde Agregar/Modificar
  Volver() {
    this.AccionABMC = "L";
  }

  ImprimirListado() {
    this.modalDialogService.Alert("Sin desarrollar...");
  }
}
