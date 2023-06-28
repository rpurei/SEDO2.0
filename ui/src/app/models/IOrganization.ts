import { IOption } from './IOption';

export interface IOrganization extends IOption {
    children: IOption[];
}
