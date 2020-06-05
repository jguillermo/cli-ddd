import {AbstractBackEndRefactor} from "./AbstractBackEndRefactor";
import {InterfaceBackEndConstructor} from "../InterfaceBackEndConstructor";
import {EntityResponse} from "../../../sdk/codeMain/application/EntityResponse";


export class EntityResponseRefactor extends AbstractBackEndRefactor {
    constructor(params: InterfaceBackEndConstructor, answer: { type: string, properties: string[] }) {
        super(params, answer);
    }

    async generate(): Promise<void> {
        const entityOriginal = new EntityResponse(this.data, this._originalProperties);
        const entityNew = new EntityResponse(this.data, this._newProperties);
        this.generateFileAddRemoveProperties(entityOriginal.template[0], entityNew.template[0]);

    }
}


