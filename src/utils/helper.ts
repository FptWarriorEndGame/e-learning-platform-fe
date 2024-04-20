/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { UserRole } from "../types/user.type";

export class Helper {
  private enumData: Record<string, Record<string, string>>; 
  private Role: any;
  private listPermission: string[]
  private adminRole: UserRole;
  constructor() {
    this.enumData = JSON.parse(localStorage.getItem("enumData") as string)
    this.adminRole = localStorage.getItem("adminRole") as UserRole
    this.Role = this.enumData?.Role 
    this.listPermission = JSON.parse(localStorage.getItem("listPermission") as string)
  }

  public checkPermission(role: string) {
      // FULL PERMISSSION WHEN YOU ARE ADMIN
      if(this.adminRole === UserRole.ADMIN || this.adminRole === UserRole.AUTHOR) return true
      return this.listPermission.some((str: string) => str === role)
  }

  get getRole() {
    return this.Role;
  }

  get getListPermission() {
    return this.listPermission;
  }

  get getEnumData() {
    return this.enumData
  }
}