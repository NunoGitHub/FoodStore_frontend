import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName: string, confirmPasswordControlName:string)=>{
  const validator = (form:AbstractControl) =>{
    const passwordControl = form.get(passwordControlName);
    const confirmPasswordControl= form.get(confirmPasswordControlName);

    if(!passwordControl || !confirmPasswordControl) return;//no values

    if(passwordControl.value !== confirmPasswordControl.value){//diferent values
      confirmPasswordControl.setErrors({notMatch:true});//get error of different values
    }
    else{
      const errors = confirmPasswordControl.errors;
      if(!errors) return;//no errors return

      delete errors["notMatch"];//delete this mismatch because the error is other thing
      confirmPasswordControl.setErrors(errors);
    }
  }
  return validator;
}
