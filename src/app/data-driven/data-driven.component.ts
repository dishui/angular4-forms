import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'data-driven',
    templateUrl: 'data-driven.component.html'
})
export class DataDrivenComponent {
    myForm: FormGroup;

    genders = [
        'male',
        'female'
    ];

    constructor(private formBuilder: FormBuilder) {
       /* this.myForm = new FormGroup({
            'userData': new FormGroup({
                'username': new FormControl('Max', Validators.required),
                'email': new FormControl('', [Validators.required, Validators.pattern('')]),
            }),  
            'password': new FormControl('', Validators.required),
            'gender': new FormControl('male'),
            'hobbies': new FormArray([
                new FormControl('Cooking', Validators.required)
            ])
        });*/

        this.myForm = formBuilder.group({
            'userData': formBuilder.group({
                'username': ['Max', [Validators.required, this.exampleValidator]],
                'email': ['', [Validators.required, Validators.pattern('')]]
            }),  
            'password': ['', Validators.required],
            'gender': ['male'],
            'hobbies': formBuilder.array([
                ['Cooking', Validators.required,  this.asyncExampleValidator]
            ])
        });

        //two interesting observables on the form
        this.myForm.valueChanges.subscribe(
            (data: any) => console.log(data)
        );

        this.myForm.statusChanges.subscribe(
            (data: any) => console.log(data)
        );
    }

    onAddHobby() {
        (<FormArray>this.myForm.get('hobbies')).push(new FormControl('', Validators.required, this.asyncExampleValidator));
    }

    onSubmit() {
        console.log(this.myForm);
    }

    exampleValidator(control: FormControl): {[s: string]: boolean} {
        if (control.value === 'Example') {
            return { example: true}; // if return anything, validation fail
        }
        return null; // validation successful
    }

    asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>(
            (resolve, reject) => {
                setTimeout(() => {
                    if (control.value === 'Example') {
                        resolve({'invalid': true});
                    } else {
                        resolve(null);
                    }
                }, 1500)
            }
        );
        return promise;
    }

    reset() {
        this.myForm.reset();
        //this.myForm.reset({username: 'Nancy', email: 'nancy@example.com'});
    }
}
