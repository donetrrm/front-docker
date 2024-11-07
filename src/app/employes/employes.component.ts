import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ApiService } from "app/shared/api/api.service";
import Swal from "sweetalert2";

export interface UserData {
  id: string;
  name: string;
  surnames: string;
  username: string;
  branch: string;
  role: string;
  updateAt: Date;
}

declare var $: any;

@Component({
  selector: "app-employes",
  templateUrl: "./employes.component.html",
  styleUrls: ["./employes.component.css"],
})
export class EmployesComponent implements OnInit {
  users: MatTableDataSource<UserData>;
  displayedColumns: string[] = [
    "name",
    "surnames",
    "username",
    "branch",
    "role",
    "updateAt",
    "actions",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router, private api: ApiService) {}

  ngOnInit(): void {
    this.api.getUsers().subscribe(
      (response) => {
        this.users = new MatTableDataSource(response);
        this.users.paginator = this.paginator;
        this.users.sort = this.sort;
        this.paginator._intl.itemsPerPageLabel = "Usuarios por página";
      },
      (error) => {
        console.log(error);
      }
    );
  }

  edit(id) {
    this.router.navigateByUrl("employes/" + id);
  }

  delete(user) {
    try {
      Swal.fire({
        title: "¿Está seguro de eliminar este usuario?",
        text: "¡Ésta acción no puede deshacerse!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar usuario!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: "PROCESANDO",
            text: "AGUARDA UN MOMENTO POR FAVOR.",
            showConfirmButton: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
          this.api.deleteUser(user.id).subscribe(
            (response) => {
              console.log(response);
              Swal.close();
              Swal.fire({
                title: "Movimiento correcto",
                text: "El usuario ha sido eliminado correctamente",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.api.getUsers().subscribe(
                    (response) => {
                      this.users = new MatTableDataSource(response);
                      this.users.paginator = this.paginator;
                      this.users.sort = this.sort;
                      this.paginator._intl.itemsPerPageLabel =
                        "Usuarios por página";
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                }
              });
            },
            (error) => {
              console.log(error);
              Swal.fire(
                "Ocurrió un error al eliminar el usuario",
                "Por favor contacta al administrador",
                "error"
              );
              console.log(error);
            }
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }
}
