import axios from "axios";
import {EventQueryResponse, UserQueryResponse} from "../../externalUser/api/EventApi";

export interface InstitutionUserQueryResponse {
    username: string;
    password: string;
}

export class LoginApi {
    async getInstitutionUsers(): Promise<InstitutionUserQueryResponse[]> {
        const response = await axios.get<InstitutionUserQueryResponse[]>("/institution");
        return response.data;
    }

    async getExternalUsers(): Promise<UserQueryResponse[]> {
        const response = await axios.get<UserQueryResponse[]>("/users");
        return response.data;
    }
}