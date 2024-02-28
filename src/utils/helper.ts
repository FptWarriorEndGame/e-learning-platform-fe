/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export class Helper {
  private enumData: Record<string, Record<string, string>>; 
  private Role: any;
  private listPermission: string[]

  constructor() {
    this.enumData = JSON.parse(localStorage.getItem("enumData") as string)
    this.Role = this.enumData?.Role 
    this.listPermission = JSON.parse(localStorage.getItem("listPermission") as string)
  }

  public checkPermission(role: string) {
      // FULL PERMISSSION WHEN YOU ARE ADMIN
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