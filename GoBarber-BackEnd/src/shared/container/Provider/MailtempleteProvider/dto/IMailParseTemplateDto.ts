interface ITempleteVariable{
    [key: string]: string | number;
}

export default interface IMailParseTemplateDto{
    file:string;
    variables:ITempleteVariable;

}
