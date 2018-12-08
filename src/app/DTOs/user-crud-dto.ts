import { User } from '../Models/user';
export class UserCrudDTO {

    public opStatus?: string;
    public hasError: boolean;
    public error: any;
    public data?: User[];

}

export class StandardUserCrudDTO {
    public opStatus?: string;
    public hasError: boolean;
    public error: any;
    public data?: any;
}
