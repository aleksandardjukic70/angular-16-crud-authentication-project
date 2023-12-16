import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Userinfo } from '../Store/Model/User.model';

export const authGuard: CanActivateFn = (route, state) => {
  const service=inject(UserService)
  const router=inject(Router)
  const userinfo:Userinfo=service.Getuserdatafromstorage();
  if(userinfo.username!='' && userinfo.username!=null){
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};
