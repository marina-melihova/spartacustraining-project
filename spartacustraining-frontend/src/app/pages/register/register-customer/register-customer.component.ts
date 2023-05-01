import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthConfigService,
  ConsentTemplate,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  OAuthFlow,
  RoutingService,
  Title,
} from '@spartacus/core';
import { CustomFormValidators, sortTitles } from '@spartacus/storefront';
import { UserRegisterFacade, UserSignUp } from '@spartacus/user/profile/root';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'st-register-customer',
  templateUrl: './register-customer.component.html',
})
export class RegisterCustomerComponent implements OnInit, OnDestroy {
  titles$: Observable<Title[]> = of([]);
  isLoading$ = new BehaviorSubject(false);
  private subscription = new Subscription();

  anonymousConsent$: Observable<{
    consent: AnonymousConsent;
    template: string;
  }> = of();

  registerForm: FormGroup = this.fb.group(
    {
      titleCode: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, CustomFormValidators.emailValidator]],
      phone: [''],
      password: [
        '',
        [Validators.required, CustomFormValidators.passwordValidator],
      ],
      passwordconf: ['', Validators.required],
      newsletter: new FormControl({
        value: false,
        disabled: this.isConsentRequired(),
      }),
      termsandconditions: [false, Validators.requiredTrue],
    },
    {
      validators: CustomFormValidators.passwordsMustMatch(
        'password',
        'passwordconf'
      ),
    }
  );

  constructor(
    private globalMessageService: GlobalMessageService,
    private fb: FormBuilder,
    private router: RoutingService,
    private anonymousConsentsService: AnonymousConsentsService,
    private anonymousConsentsConfig: AnonymousConsentsConfig,
    private authConfigService: AuthConfigService,
    private userRegisterFacade: UserRegisterFacade
  ) {}

  ngOnInit() {
    this.titles$ = this.userRegisterFacade.getTitles().pipe(
      map((titles: Title[]) => {
        return titles.sort(sortTitles);
      })
    );

    this.subscription.add(
      this.globalMessageService
        .get()
        .pipe(filter((messages) => !!Object.keys(messages).length))
        .subscribe((globalMessageEntities: GlobalMessageEntities) => {
          const messages =
            globalMessageEntities &&
            globalMessageEntities[GlobalMessageType.MSG_TYPE_ERROR];
          if (
            messages &&
            messages.some(
              (message) => message.raw === 'This field is required.'
            )
          ) {
            this.globalMessageService.remove(GlobalMessageType.MSG_TYPE_ERROR);
            this.globalMessageService.add(
              { key: 'register.titleRequired' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        })
    );

    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent ?? '';

    this.anonymousConsent$ = combineLatest([
      this.anonymousConsentsService.getConsent(registerConsent),
      this.anonymousConsentsService.getTemplate(registerConsent),
    ]).pipe(
      map(([consent, template]: [AnonymousConsent, ConsentTemplate]) => {
        return {
          consent,
          template: template?.description ? template.description : '',
        };
      })
    );

    this.subscription.add(
      this.registerForm.get('newsletter')!.valueChanges.subscribe(() => {
        this.toggleAnonymousConsent();
      })
    );
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.registerUser();
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  registerUser(): void {
    this.isLoading$.next(true);
    this.userRegisterFacade
      .register(this.collectDataFromRegisterForm(this.registerForm.value))
      .subscribe({
        next: () => this.onRegisterUserSuccess(),
        complete: () => this.isLoading$.next(false),
      });
  }

  titleSelected(title: Title): void {
    this.registerForm['controls'].titleCode.setValue(title.code);
  }

  collectDataFromRegisterForm(formData: any): UserSignUp {
    const { firstName, lastName, email, password, titleCode } = formData;
    return {
      firstName,
      lastName,
      uid: email.toLowerCase(),
      password,
      titleCode,
    };
  }

  firstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }

  lastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }

  email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  phone(): FormControl {
    return this.registerForm.get('phone') as FormControl;
  }

  password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  passwordconf(): FormControl {
    return this.registerForm.get('passwordconf') as FormControl;
  }

  termsandconditions(): FormControl {
    return this.registerForm.get('termsandconditions') as FormControl;
  }

  isConsentGiven(consent: AnonymousConsent): boolean {
    return this.anonymousConsentsService.isConsentGiven(consent);
  }

  private isConsentRequired(): boolean {
    const requiredConsents =
      this.anonymousConsentsConfig?.anonymousConsents?.requiredConsents;
    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent;
    if (requiredConsents && registerConsent) {
      return requiredConsents.includes(registerConsent);
    }
    return false;
  }

  private onRegisterUserSuccess(): void {
    if (
      this.authConfigService.getOAuthFlow() ===
      OAuthFlow.ResourceOwnerPasswordFlow
    ) {
      this.router.go('login');
    }
    this.globalMessageService.add(
      { key: 'register.postRegisterMessage' },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  }

  toggleAnonymousConsent(): void {
    const registerConsent =
      this.anonymousConsentsConfig?.anonymousConsents?.registerConsent;

    if (registerConsent) {
      if (Boolean(this.registerForm.get('newsletter')!.value)) {
        this.anonymousConsentsService.giveConsent(registerConsent);
      } else {
        this.anonymousConsentsService.withdrawConsent(registerConsent);
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
