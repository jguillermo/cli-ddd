import {AbstractBackEndRefactor} from "./AbstractBackEndRefactor";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";
import {Dao} from "../../../sdk/codeMain/infrastructure/persistence/Dao";


export class DaoRefactor extends AbstractBackEndRefactor {
    constructor(params: InterfaceBackEndConstructor, answer: { type: string, properties: string[] }) {
        super(params, answer);
    }

    async generate(): Promise<void> {
        const daoOriginal = new Dao(this.data, this._originalProperties);
        const daoNew = new Dao(this.data, this._newProperties);
        this.generateFileAddRemoveProperties(daoOriginal.template[0], daoNew.template[0]);

    }
}


