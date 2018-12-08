export class LoginDTO {
    public status?: string;
    public token?: string;
    public username?: string;
    public hasError: boolean;
    public error: any;
    public typeOfUser?: string;

}
