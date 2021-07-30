import axios from "axios";
import {MessageResponse} from "../../../common/dto/MessageResponse";
import {EventModel} from "../addEvent/AddEvent";
import {InstituteEventModel} from "../../institutionUser/addEventToInstitute/AddEventToInstitute";
import {UserModel} from "../addUserToEvent/AddUserToEvent";

export interface EventQueryResponse {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    eventQuota: number;
    creatorInstId: number;
}

export interface UserQueryResponse {
    id: number;
    firstname: string;
    lastname: string;
    tcKimlikNumber: string;
    email: string;
    password: string;
}

export class EventApi {

    async addEvent(eventModel: EventModel): Promise<MessageResponse> {
        const response = await axios.post<MessageResponse>("http://localhost:8080/events", eventModel);
        return response.data;
    }

    async addUserToEvent(userModel: UserModel): Promise<MessageResponse> {
        const response = await axios.post<MessageResponse>("http://localhost:8080/events/adduser", userModel);
        return response.data;
    }

    async getEvents(): Promise<EventQueryResponse[]> {
        const response = await axios.get<EventQueryResponse[]>("http://localhost:8080/events");
        return response.data;
    }

    async getEventsOfUser(username: String): Promise<EventQueryResponse[]> {
        const response = await axios.get<EventQueryResponse[]>(`http://localhost:8080/institution/${username}/events`);
        return response.data;
    }

    async getEventsOfExternalUser(tcKimlikNumber: String): Promise<EventQueryResponse[]> {
        const response = await axios.get<EventQueryResponse[]>(`http://localhost:8080/users/${tcKimlikNumber}/events`);
        return response.data;
    }

    async addEventToInstitutionUser(eventModel: InstituteEventModel): Promise<MessageResponse> {
        const response = await axios.post<MessageResponse>("http://localhost:8080/institution/addevent", eventModel);
        return response.data;
    }

    async getExternalUsersOfEvent(eventId: String): Promise<UserQueryResponse[]> {
        const response = await axios.get<UserQueryResponse[]>("http://localhost:8080/events/"+eventId+"/users");
        return response.data;
    }

    async getNumOfUsersForEvents(): Promise<number[]> {
        const response = await axios.get<number[]>("http://localhost:8080/events/userNumber");
        return response.data;
    }

    async getInstitutionUser(id: String): Promise<UserQueryResponse> {
        const response = await axios.get<UserQueryResponse>("http://localhost:8080/institution/"+id);
        return response.data;
    }

    async updateEvent(eventModel: InstituteEventModel): Promise<MessageResponse> {
        const response = await axios.post<MessageResponse>("http://localhost:8080/events/updateEvent", eventModel);
        return response.data;
    }

}
