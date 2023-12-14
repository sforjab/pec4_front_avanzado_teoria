import { DuplicatePipe } from "./duplicate.pipe";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

describe('DuplicatePipe', () => {
    // Se declara la variable de tipo 'DuplicatePipe'
    let pipe: DuplicatePipe;

    // Antes de cada test declaramos la instancia
    beforeEach(() => {
        pipe = new DuplicatePipe();
    });

    // TEST 1: que se cree correctamente el pipe
    it('should create', () => {
        expect(pipe).toBeTruthy();
    });

    // TEST 2: que se obtenga el resultado esperado
    it('duplicate pipe success', () => {
        let number: number = 4;
        const result = pipe.transform(number);
        expect(result).toBe(8);
    });
});