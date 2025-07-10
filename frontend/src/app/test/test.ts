// import { Component, computed, signal } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';

// @Component({
//   selector: 'app-test',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   template: `
//     <div class="container" [@containerResize]="currentStep()">
//       <div class="form-wrapper">
//         <!-- Regisztrációs form -->
//         <fieldset 
//           class="form-fieldset registration-form" 
//           [@fadeAnimation]="currentStep() === 'registration' ? 'visible' : 'hidden'"
//           [class.active]="currentStep() === 'registration'">
//           <legend class="title" [@titleAnimation]="titleText()">{{ titleText() }}</legend>
//           <form [formGroup]="registerForm" (ngSubmit)="register()">
//             <div class="form-group" [@slideInAnimation]="'in'">
//               <label for="username">Felhasználónév</label>
//               <input 
//                 id="username"
//                 type="text" 
//                 formControlName="username"
//                 [class.error]="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
//             </div>
            
//             <div class="form-group" [@slideInAnimation]="'in'">
//               <label for="email">Email</label>
//               <input 
//                 id="email"
//                 type="email" 
//                 formControlName="email"
//                 [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
//             </div>
            
//             <div class="form-group" [@slideInAnimation]="'in'">
//               <label for="password">Jelszó</label>
//               <input 
//                 id="password"
//                 type="password" 
//                 formControlName="password"
//                 [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
//             </div>
            
//             <div class="form-group" [@slideInAnimation]="'in'">
//               <label for="confirmPassword">Jelszó megerősítése</label>
//               <input 
//                 id="confirmPassword"
//                 type="password" 
//                 formControlName="confirmPassword"
//                 [class.error]="registerForm.get('confirmPassword')?.invalid && registerForm.get('confirmPassword')?.touched">
//             </div>
            
//             <button 
//               type="submit" 
//               class="submit-btn"
//               [disabled]="registerForm.invalid || isLoading()"
//               [@buttonAnimation]="'normal'">
//               {{ isLoading() ? 'Regisztráció...' : 'Regisztráció' }}
//             </button>
//           </form>
//         </fieldset>

//         <!-- Verifikációs form -->
//         <fieldset 
//           class="form-fieldset verification-form" 
//           [@fadeAnimation]="currentStep() === 'verification' ? 'visible' : 'hidden'"
//           [class.active]="currentStep() === 'verification'">
//           <legend class="title" [@titleAnimation]="titleText()">{{ titleText() }}</legend>
//           <form [formGroup]="verificationForm" (ngSubmit)="verify()">
//             <div class="verification-info" [@slideInAnimation]="'in'">
//               <p>Kérjük, add meg a 6 jegyű kódot, amelyet emailben küldtünk:</p>
//               <span class="email-display">{{ registerForm.get('email')?.value }}</span>
//             </div>
            
//             <div class="otp-input" [@otpAnimation]="'in'">
//               <input 
//                 type="text" 
//                 formControlName="digit1" 
//                 maxlength="1"
//                 (input)="onOtpInput($event, 1)"
//                 (keydown)="onOtpKeydown($event, 1)"
//                 #input1>
//               <input 
//                 type="text" 
//                 formControlName="digit2" 
//                 maxlength="1"
//                 (input)="onOtpInput($event, 2)"
//                 (keydown)="onOtpKeydown($event, 2)"
//                 #input2>
//               <input 
//                 type="text" 
//                 formControlName="digit3" 
//                 maxlength="1"
//                 (input)="onOtpInput($event, 3)"
//                 (keydown)="onOtpKeydown($event, 3)"
//                 #input3>
//               <input 
//                 type="text" 
//                 formControlName="digit4" 
//                 maxlength="1"
//                 (input)="onOtpInput($event, 4)"
//                 (keydown)="onOtpKeydown($event, 4)"
//                 #input4>
//               <input 
//                 type="text" 
//                 formControlName="digit5" 
//                 maxlength="1"
//                 (input)="onOtpInput($event, 5)"
//                 (keydown)="onOtpKeydown($event, 5)"
//                 #input5>
//               <input 
//                 type="text" 
//                 formControlName="digit6" 
//                 maxlength="1"
//                 (input)="onOtpInput($event, 6)"
//                 (keydown)="onOtpKeydown($event, 6)"
//                 #input6>
//             </div>
            
//             <button 
//               type="submit" 
//               class="submit-btn"
//               [disabled]="verificationForm.invalid || isLoading()"
//               [@buttonAnimation]="'normal'">
//               {{ isLoading() ? 'Ellenőrzés...' : 'Ellenőrzés' }}
//             </button>
            
//             <button 
//               type="button" 
//               class="back-btn"
//               (click)="goBackToRegistration()"
//               [@buttonAnimation]="'normal'">
//               Vissza
//             </button>
//           </form>
//         </fieldset>
//       </div>
//     </div>
//   `,
//   styleUrls: ['./test.scss'],
//   animations: [
//     // Konténer méret animáció
//     trigger('containerResize', [
//       state('registration', style({
//         height: '600px',
//         width: '400px'
//       })),
//       state('verification', style({
//         height: '450px',
//         width: '400px'
//       })),
//       transition('registration <=> verification', [
//         animate('600ms cubic-bezier(0.25, 0.8, 0.25, 1)')
//       ])
//     ]),
    
//     // Fade animáció a formokhoz
//     trigger('fadeAnimation', [
//       state('visible', style({
//         opacity: 1,
//         transform: 'translateY(0)',
//         pointerEvents: 'auto'
//       })),
//       state('hidden', style({
//         opacity: 0,
//         transform: 'translateY(20px)',
//         pointerEvents: 'none'
//       })),
//       transition('hidden => visible', [
//         animate('400ms 200ms cubic-bezier(0.25, 0.8, 0.25, 1)')
//       ]),
//       transition('visible => hidden', [
//         animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')
//       ])
//     ]),
    
//     // Cím animáció
//     trigger('titleAnimation', [
//       transition('* => *', [
//         animate('500ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
//           transform: 'scale(1.05)'
//         })),
//         animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
//           transform: 'scale(1)'
//         }))
//       ])
//     ]),
    
//     // Slide-in animáció az input mezőkhöz
//     trigger('slideInAnimation', [
//       transition(':enter', [
//         style({
//           transform: 'translateX(-50px)',
//           opacity: 0
//         }),
//         animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
//           transform: 'translateX(0)',
//           opacity: 1
//         }))
//       ])
//     ]),
    
//     // OTP input animáció
//     trigger('otpAnimation', [
//       transition(':enter', [
//         query('input', [
//           style({
//             transform: 'scale(0.5)',
//             opacity: 0
//           }),
//           stagger('50ms', [
//             animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
//               transform: 'scale(1)',
//               opacity: 1
//             }))
//           ])
//         ])
//       ])
//     ]),
    
//     // Gomb animáció
//     trigger('buttonAnimation', [
//       state('normal', style({
//         transform: 'scale(1)'
//       })),
//       transition('* => *', [
//         animate('150ms cubic-bezier(0.25, 0.8, 0.25, 1)')
//       ])
//     ])
//   ]
// })
// export class Test {
//   // Signals
//   currentStep = signal<'registration' | 'verification'>('registration');
//   isLoading = signal<boolean>(false);
  
//   // Computed signal a címhez
//   titleText = computed(() => {
//     return this.currentStep() === 'registration' ? 'Regisztráció' : 'Ellenőrzés';
//   });

//   // Form groups
//   registerForm: FormGroup;
//   verificationForm: FormGroup;

//   constructor(private fb: FormBuilder) {
//     this.registerForm = this.fb.group({
//       username: ['', [Validators.required, Validators.minLength(3)]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(8)]],
//       confirmPassword: ['', [Validators.required]]
//     });

//     this.verificationForm = this.fb.group({
//       digit1: ['', [Validators.required, Validators.pattern(/^\d$/)]],
//       digit2: ['', [Validators.required, Validators.pattern(/^\d$/)]],
//       digit3: ['', [Validators.required, Validators.pattern(/^\d$/)]],
//       digit4: ['', [Validators.required, Validators.pattern(/^\d$/)]],
//       digit5: ['', [Validators.required, Validators.pattern(/^\d$/)]],
//       digit6: ['', [Validators.required, Validators.pattern(/^\d$/)]],
//     });
//   }

//   async register() {
//     if (this.registerForm.valid) {
//       this.isLoading.set(true);
      
//       try {
//         // Szimulált API hívás
//         await new Promise(resolve => setTimeout(resolve, 2000));
        
//         // Átváltás a verifikációs lépésre
//         this.currentStep.set('verification');
        
//         // Első OTP input fókusz
//         setTimeout(() => {
//           const firstInput = document.querySelector('.otp-input input:first-child') as HTMLInputElement;
//           if (firstInput) {
//             firstInput.focus();
//           }
//         }, 600);
        
//       } catch (error) {
//         console.error('Regisztrációs hiba:', error);
//       } finally {
//         this.isLoading.set(false);
//       }
//     }
//   }

//   async verify() {
//     if (this.verificationForm.valid) {
//       this.isLoading.set(true);
      
//       try {
//         const otpCode = Object.values(this.verificationForm.value).join('');
//         console.log('OTP kód:', otpCode);
        
//         // Szimulált API hívás
//         await new Promise(resolve => setTimeout(resolve, 1500));
        
//         alert('Sikeres regisztráció!');
        
//       } catch (error) {
//         console.error('Verifikációs hiba:', error);
//       } finally {
//         this.isLoading.set(false);
//       }
//     }
//   }

//   goBackToRegistration() {
//     this.currentStep.set('registration');
//     this.verificationForm.reset();
//   }

//   // OTP input kezelés
//   onOtpInput(event: any, position: number) {
//     const input = event.target;
//     const value = input.value;
    
//     // Csak számokat engedélyez
//     if (!/^\d*$/.test(value)) {
//       input.value = value.replace(/\D/g, '');
//       return;
//     }
    
//     // Következő input-ra lépés
//     if (value.length === 1 && position < 6) {
//       const nextInput = document.querySelector(`.otp-input input:nth-child(${position + 1})`) as HTMLInputElement;
//       if (nextInput) {
//         nextInput.focus();
//       }
//     }
//   }

//   onOtpKeydown(event: KeyboardEvent, position: number) {
//     const input = event.target as HTMLInputElement;
    
//     // Backspace kezelés
//     if (event.key === 'Backspace' && !input.value && position > 1) {
//       const prevInput = document.querySelector(`.otp-input input:nth-child(${position - 1})`) as HTMLInputElement;
//       if (prevInput) {
//         prevInput.focus();
//       }
//     }
//   }
// }


// registration.component.ts
import { CommonModule } from '@angular/common';
import { Component, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.html',
  styleUrls: ['./test.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class Test {
  @ViewChild('fieldsetContainer', { static: true }) fieldsetContainer!: ElementRef;
  @ViewChild('legendContainer', { static: true }) legendContainer!: ElementRef;

  registerForm: FormGroup;
  verificationForm: FormGroup;
  
  private _passwordVisible = signal(false);
  private _currentStep = signal<'registration' | 'verification'>('registration');
  private _isAnimating = signal(false);
  private _userEmail = signal<string>('');

  passwordVisible = computed(() => this._passwordVisible());
  currentStep = computed(() => this._currentStep());
  isAnimating = computed(() => this._isAnimating());
  userEmail = computed(() => this._userEmail());

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.verificationForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit2: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit3: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit4: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit5: ['', [Validators.required, Validators.pattern(/^\d$/)]],
      digit6: ['', [Validators.required, Validators.pattern(/^\d$/)]],
    });
  }

  get password() {
    return this.registerForm.get('password')!;
  }

  inputType(): string {
    return this.passwordVisible() ? 'text' : 'password';
  }

  revealPassword(): void {
    this._passwordVisible.set(!this._passwordVisible());
  }

  async register(): Promise<void> {
    if (this.registerForm.invalid || this.isAnimating()) return;

    this._isAnimating.set(true);
    this._userEmail.set(this.registerForm.get('email')?.value || '');

    try {
      // Simulate API call
      await this.simulateApiCall();
      
      // Start transition animation
      await this.animateStepTransition('verification');
      
    } catch (error) {
      console.error('Registration failed:', error);
      this._isAnimating.set(false);
    }
  }

  async onVerify(): Promise<void> {
    if (this.verificationForm.invalid || this.isAnimating()) return;

    this._isAnimating.set(true);

    try {
      // Simulate verification API call
      await this.simulateApiCall();
      
      // Handle successful verification
      console.log('Verification successful!');
      
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      this._isAnimating.set(false);
    }
  }

  onInput(event: Event, position: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value && /^\d$/.test(value)) {
      // Move to next input if current is filled
      if (position < 6) {
        const nextInput = document.querySelector(`input[formControlName="digit${position + 1}"]`) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  }

  onOtpKeydown(event: KeyboardEvent, position: number): void {
    const input = event.target as HTMLInputElement;
    
    if (event.key === 'Backspace' && !input.value && position > 1) {
      // Move to previous input on backspace if current is empty
      const prevInput = document.querySelector(`input[formControlName="digit${position - 1}"]`) as HTMLInputElement;
      prevInput?.focus();
    }
  }

  private async animateStepTransition(newStep: 'registration' | 'verification'): Promise<void> {
    const fieldset = this.fieldsetContainer.nativeElement;
    const legendContainer = this.legendContainer.nativeElement;
    
    // Get current height
    const currentHeight = fieldset.offsetHeight;
    
    // Temporarily show new content to measure its height
    this._currentStep.set(newStep);
    fieldset.style.height = 'auto';
    const newHeight = fieldset.offsetHeight;
    
    // Reset to current step and height
    this._currentStep.set(newStep === 'verification' ? 'registration' : 'verification');
    fieldset.style.height = `${currentHeight}px`;
    
    // Force reflow
    fieldset.offsetHeight;
    
    // Start animations
    await Promise.all([
      this.animateLegend(newStep),
      this.animateFieldset(newHeight),
      this.animateContent(newStep)
    ]);
    
    // Cleanup
    fieldset.style.height = 'auto';
    this._isAnimating.set(false);
  }

  private async animateLegend(newStep: 'registration' | 'verification'): Promise<void> {
    const legendContainer = this.legendContainer.nativeElement;
    const currentLegend = legendContainer.querySelector('.legend-current');
    const newLegend = legendContainer.querySelector('.legend-new');
    
    const newText = newStep === 'verification' ? 'Verification Code' : 'Regisztráció';
    newLegend.textContent = newText;
    
    // Animate legends
    currentLegend.style.transform = 'rotateX(-90deg)';
    newLegend.style.transform = 'rotateX(0deg)';
    
    return new Promise(resolve => {
      setTimeout(() => {
        currentLegend.textContent = newText;
        currentLegend.style.transform = 'rotateX(0deg)';
        newLegend.style.transform = 'rotateX(90deg)';
        resolve();
      }, 300);
    });
  }

  private async animateFieldset(newHeight: number): Promise<void> {
    const fieldset = this.fieldsetContainer.nativeElement;
    
    return new Promise(resolve => {
      fieldset.style.height = `${newHeight}px`;
      setTimeout(resolve, 400);
    });
  }

  private async animateContent(newStep: 'registration' | 'verification'): Promise<void> {
    const forms = this.fieldsetContainer.nativeElement.querySelectorAll('.form-content');
    
    // Fade out current content
	forms.forEach((form: HTMLElement) => {
		form.style.opacity = '0.3';
		form.style.pointerEvents = 'none';
	});
    
    return new Promise(resolve => {
      setTimeout(() => {
        this._currentStep.set(newStep);
        
        // Fade in new content
        setTimeout(() => {
          forms.forEach((form: HTMLElement) => {
            form.style.opacity = '1';
            form.style.pointerEvents = 'auto';
          });
          resolve();
        }, 100);
      }, 200);
    });
  }

  private simulateApiCall(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }
}