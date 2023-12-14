import { PostService } from "src/app/Services/post.service";
import { HomeComponent } from "./home.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { PostDTO } from "src/app/Models/post.dto";
import { of } from "rxjs/internal/observable/of";

describe('HomeComponent', () => {
    // Se declara la variable 'component' de tipo 'HomeComponent'
    let component: HomeComponent;
    // Declaramos el 'fixture' para poder gestionar posteriormente el 'component'
    let fixture: ComponentFixture<HomeComponent>;

    // Antes de cada test
    beforeEach(() => {
        // Configuración del test para un componente. Tenemos que importar y vincular todas las dependencias
        TestBed.configureTestingModule({
            // Nos hace falta importar el módulo para testear llamadas a una API pero de manera simulada
            imports: [HttpClientTestingModule],
            // En 'declarations' ponemos el componente a testear
            declarations: [HomeComponent],
            // Dependencias (normalmente los servicios que tenga inyectados el componente en su constructor). En este caso solamente haría falta PostService
            providers: [PostService],
            // Suele ponerse para evitar errores
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            // Hay que ejecutar el 'compileComponents'
        }).compileComponents();
    });

    // Antes de cada test: instanciamos el componente
    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        // Hacemos que se instancie el componente y con el 'detectChanges' es como si pasara por el 'ngOnInit'
        fixture.detectChanges();
    })

    // TEST 1: que se cree correctamente el component
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // TEST 2: load posts success
    it('loadPosts success from subscription', () => {
        // Definimos la dependencia del servicio
        const postsService = fixture.debugElement.injector.get(PostService);
        // Lista de posts 'mock', en este ejemplo usamos una lista vacía
        const listPosts: PostDTO[] = [];
        // Espía para simular el método 'getPosts' del servicio. Le decimos que nos devolverá una lista de posts y
        // que será un 'Observable', de ahí que usemos 'of'
        const spy = spyOn(postsService, 'getPosts').and.returnValue(of(listPosts));
        // Llamamos al método privado 'loadPosts' del componente 'HomeComponent'
        component['loadPosts']();
        // Esperamos que la variable 'posts' del 'HomeComponent' donde se mapea el resultado de la llamada anterior
        // tenga el número de posts correcto, en este caso, como 'listPosts' 'mock' tiene 0 posts, el resultado esperado es 0
        expect(component.posts.length).toBe(0);
    });
});