import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";
import { AbstractControl, AsyncValidator, AsyncValidatorFn } from "@angular/forms";
import { environment } from "../../../environments/environment.development";
import { delay, map } from "rxjs";

const USER_FILTER_USERNAME= `${environment.HOST}/api/v1/user`

export const validadorNombre = ():AsyncValidatorFn =>{
    const http = inject(HttpClient)

    return (control:AbstractControl)=>{
        if(!control.value) {
            return null
        }
        const url = `${USER_FILTER_USERNAME}/username/${control.value}`
        return http.get<{ status: number; message: string; data: boolean[]}>(url)
            .pipe(
                map(response=> response.data[0]),
                map(existe => existe? {usuarioExiste:true}:null),
                delay(2000)
            )

    }
}

export const validadoEmail = ():AsyncValidatorFn =>{
    const http = inject(HttpClient)

    return (control:AbstractControl)=>{
        if(!control.value) {
            return null
        }
        const url = `${USER_FILTER_USERNAME}/email/${control.value}`
        return http.get<{ status: number; message: string; data: boolean[]}>(url)
            .pipe(
                map(response=> response.data[0]),
                map(existe => existe? {emailExiste:true}:null),
                delay(2000)
            )

    }
}
