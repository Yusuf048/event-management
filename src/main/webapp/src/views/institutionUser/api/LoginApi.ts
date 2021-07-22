import axios from "axios";
import {EventQueryResponse} from "../../externalUser/api/EventApi";

export interface InstitutionUserQueryResponse {
    username: string;
    password: string;
}

export class LoginApi {
    async getInstitutionUsers(): Promise<InstitutionUserQueryResponse[]> {
        const response = await axios.get<InstitutionUserQueryResponse[]>("/institution");
        return response.data;
    }
}