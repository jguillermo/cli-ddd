import {AbstractGenerate, Template} from "../../AbstractGenerate";
import {Config} from "../../config/Config";

export class Aggregate extends AbstractGenerate {
    private config: Config;
    private _properties: string[];

    constructor(_data: any, properties: string[] | null = null) {
        super();
        this.config = new Config(_data);
        this._properties = properties ?? this.config.properties
    }

    get folder(): string {
        return `${this.config.mainPath}/domain`;
    }

    get package(): string {
        return `${this.config.package}.domain`;
    }

    get template(): Template[] {
        const template: Template[] = [];
        const className = this.config.entity;
        const file = `${this.folder}/${className}.java`;
        const fileTemplate = `main/domain/aggregate`;
        const voProperties = this.config.valueObjectProperties(this._properties)
        const data = {
            className,
            package: this.package,
            strProperties: this.strProperties(this._properties),
            strPropertiesToString: this.strPropertiesToString(this._properties),
            strVoProperties: this.strVoProperties(voProperties),
            strPropertiesEquals: this.strPropertiesEquals(this._properties),
            voProperties
        };
        template.push(new Template(this.folder, file, fileTemplate, data));
        return template;
    }
}



