// Model create for basicDetail

export interface basicDetails {
    name: string;
    key: string;
    status: boolean;
}
export interface basicInformations {
    name: string;
    status: boolean;
    elements: Array<basicDetails>;
}