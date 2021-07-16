import axios from "axios";
import {MessageResponse} from "../../../common/dto/MessageResponse";
import {EventModel} from "../addEvent/AddEvent";

export interface EventQueryResponse {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    eventQuota: number;
}

export class EventApi {

    async addEvent(eventModel: EventModel): Promise<MessageResponse> {
        const response = await axios.post<MessageResponse>("/events", eventModel);
        return response.data;
    }

    async getEvents(): Promise<EventQueryResponse[]> {
        const response = await axios.get<EventQueryResponse[]>("/events");
        return response.data;
    }
}
