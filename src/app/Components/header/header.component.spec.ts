import { HeaderComponent } from "./header.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";

class TemporalComponentForRoutes {}

describe('HeaderComponent', () => {
    // Se declara la variable 'component' de tipo 'HomeComponent'
    let component: HeaderComponent;
    // Declaramos el 'fixture' para poder gestionar posteriormente el 'component'
    let fixture: ComponentFixture<HeaderComponent>;

    // Antes de cada test
    beforeEach(() => {
        // Configuración del test para un componente. Tenemos que importar y vincular todas las dependencias
        TestBed.configureTestingModule({
            // Nos hace falta importar el módulo para testear rutas
            imports: [
                // Declaramos todas las rutas a testear
                RouterTestingModule.withRoutes([
                    {
                        path: 'home',
                        // En 'component' tendríamos que poner el 'HomeComponent', pero para no tener que importar todas las dependencias del 'HomeComponent'
                        // y ensuciar así el test del 'HeaderComponent', lo que podemos hacer es crear una clase 'TemporalComponentForRoutes' "vacía"
                        component: TemporalComponentForRoutes,
                    },
                ]),
            ],
            // En 'declarations' ponemos el componente a testear
            declarations: [HeaderComponent],
            // Suele ponerse para evitar errores
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            // Hay que ejecutar el 'compileComponents'
        }).compileComponents();
    });

    // Antes de cada test: instanciamos el componente
    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        // Hacemos que se instancie el componente y con el 'detectChanges' es como si pasara por el 'ngOnInit'
        fixture.detectChanges();
    })

    // TEST 1: que se cree correctamente el component
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TEST 2: que naveguemos correctamente cuando se lance el método 'home' del componente 'HeaderComponent'
    it('should navigate to home', () => {
        // Declaramos el router
        const router = TestBed.inject(Router);
        // Espiamos que el router escuche si se llama a un método de navegación 'navigateByUrl'
        const spy = spyOn(router, 'navigateByUrl');
        // Ejecutamos el método 'home' del 'HeaderComponent'
        component.home();
        // Se espera que se lance un 'navigateByUrl' con argumento 'home'
        expect(spy).toHaveBeenCalledWith('home');
    });
});