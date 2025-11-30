# Flights Angular — README
## Groupe

* David CHAU
* Brian MADAPATHAGE SENANAYAKE
* Eden OUDAYA
* Daniel MONTEIRO

## Infomation importante

Pour les tests avec la BDD statique, il faut sélectionner un vol dont la date est comprise entre le 1er et le 2 janvier 2026.

## Description du projet

Flights Angular est une application permettant de rechercher des vols, d’afficher leurs détails, de gérer une réservation et d’offrir un système complet d’authentification.
Le projet suit toutes les contraintes liées au travail demandé :

* Authentification
* Formulaires réactifs
* Routing avancé
* Services
* Pipes
* Directives
* Backend JSON
* Et plusieurs composants réutilisés

---

# Fonctionnalités principales

* Connexion / Inscription
* Recherche de vols
* Détails d’un vol + gestion de réservation
* Routing avec paramètres
* Combobox dynamique pour filtrer les aéroports
* Directive d’animation
* Pipe de conversion/formatage de devise

---

# Authentification

## Fichier : `auth.component.ts`

### Formulaire de connexion (extrait réel)

```ts
loginForm = new FormGroup({
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', Validators.required),
});
```

### Méthode de connexion réelle

```ts
onSubmit(): void {
  this.authService.getUser(this.loginForm.value.email!, this.loginForm.value.password!).subscribe(users => {
    if (users.length > 0) {
      this.authService.loginUser(users[0].id, users[0].first_name, users[0].last_name);
      this.router.navigate(['']);
    } else {
      this.wrongPassword = true;
    }
  });
}
```

---

## Inscription — `register.component.ts`

### Formulaire réel

```ts
registerForm = new FormGroup({
  firstname: new FormControl('', Validators.required),
  lastname: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  password: new FormControl('', [Validators.required, Validators.minLength(6), commonPasswordValidator]),
  passwordcheck: new FormControl('', [Validators.required, Validators.minLength(6)]),
})
```

### Soumission réelle

```ts
if (this.registerForm.value.password !== this.registerForm.value.passwordcheck) {
  alert('Passwords do not match.');
  return;
}

const newUser : User = {
  id : crypto.randomUUID(),
  first_name: this.registerForm.value.firstname!,
  last_name: this.registerForm.value.lastname!,
  email: this.registerForm.value.email!,
  password: this.registerForm.value.password!,
};

this.authService.addUser(newUser).subscribe(user => {
  alert('Registration successful! You can now log in.');
  this.registerForm.reset();
});
```

---

# Custom Validator

## Fichier : `common-password.validator.ts`

```ts
export function commonPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.toLowerCase();
  if (!value) return null;

  const isCommon = COMMON_PASSWORDS.includes(value);
  return isCommon ? { commonPassword: true } : null;
}
```

---

# Composants avec Input / Output


## `reservation-detail-payment.component.ts` — Inputs

```ts
@Input() luggagePriceInput = 0;
@Input() seatPriceInput = 0;
```

---

## `flight-recap-form.component.ts` — Inputs

```ts
@Input() from = '';
@Input() to = '';
@Input() date?: string | Date | null;
```

---

## `flight-card-detail.component.ts` — Input + Output

```ts
@Input() flight: any;
@Output() selectedFlight = new EventEmitter<any>();
```

---

## `flight-card.component.ts` — Input + Output

```ts
@Input() flight: any;
@Output() cardClick = new EventEmitter<void>();
```

---

## `reservation-detail-bagage.component.ts` — Output

```ts
@Output() seatPriceOutput = new EventEmitter<number>();
```

---

## Directive : `spin-logo.directive.ts` — Input

```ts
@Input() appSpinLogo = '';
```

---

# Routing

## Fichier : `app.routes.ts`

```ts
export const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'login', component: AuthComponent, canActivate: [authRedirectGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [authRedirectGuard] },
  { path: 'flights', component: FlightComponent },
  { path: 'flight-details/:reference', component: ReservationDetailsComponent }
];
```

---

# Composants

## Composant réutilisé : `flight-summary-card.component.ts`

```ts
@Component({
  selector: 'app-flight-summary-card',
  imports: [],
  templateUrl: './flight-summary-card.component.html',
  styleUrl: './flight-summary-card.component.css'
})
export class FlightSummaryCardComponent {}
```

---

# Reactive Forms

## Fichier : `flight-search-form.component.ts`

### Formulaire complet

```ts
this.flightForm = this.formBuilder.group({
  from: ["",Validators.required],
  to: ["",Validators.required],
  start: ["",Validators.required],
  end: ["",Validators.required],
  passengerNumber: ["1",Validators.required],
  ticketClass:  ["Economy",Validators.required],
});
```

---

# Services (HTTP)

Ton projet utilise plusieurs services :

* `auth.service.ts`
* `flight.service.ts`
* `airport.service.ts`

## Exemple réel : recherche de vols

```ts
this.flightService.searchFlights(
  origin,
  destination,
  dateDeparture,
  numberOfPassenger,
  returnDateValue
);
this.router.navigate(['/flights']);
```

---

# Pipe Custom

## Fichier : `currency-converter.pipe.ts`

```ts
@Pipe({
  name: 'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform {
  transform(value: number | string, currencyCode: string = 'EUR', symbol: string = '€'): string {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue) || numericValue === null) {
      return '';
    }

    const formatter = new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });

    return `${formatter.format(numericValue)} ${symbol} (${currencyCode})`;
  }
}
```

---

# Directive Custom

## Fichier : `spin-logo.directive.ts`

```ts
@Directive({
  selector: '[appSpinLogo]'
})
export class SpinLogoDirective {

  @Input() appSpinLogo: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onEnter() {
    this.el.nativeElement.classList.add(this.appSpinLogo)
  }

  @HostListener('mouseleave')
  onLeave() {
    this.el.nativeElement.classList.remove(this.appSpinLogo)
  }
}
```

---

# Utilisation du backend

Ton projet communique avec un backend JSON local via des services HTTP.
Tables présentes (selon ton API) :

* users
* airports
* flights
* reservations

---

# Installation

```bash
npm install
ng serve
```

Backend JSON :

```bash
json-server backend/db.json
```

