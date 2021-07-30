import {DataGrid, GridApi} from "@material-ui/data-grid";
import {useState} from "react";
import {EventApi, EventQueryResponse} from "../../externalUser/api/EventApi";
import {Button} from "@material-ui/core";
import {UpdateEventForm} from "../updateEventForm/UpdateEventForm";
import {InstituteEventModel} from "../addEventToInstitute/AddEventToInstitute";
import {MessageType} from "../../../common/dto/MessageResponse";
import {toast} from "react-toastify";

const tableColumns = [
    {field: "id", headerName: "ID", width: 120},
    {field: "name", headerName: "NAME", width: 250},
    {field: "startDate", headerName: "STARTDATE", width: 250},
    {field: "endDate", headerName: "ENDDATE", width: 250},
    {field: "eventQuota", headerName: "EVENTQUOTA", width: 250},
    {field: "",
        headerName: "Action",
        disableClickEventBubbling: true,
        renderCell: (params: { api: GridApi; getValue: (arg0: any, arg1: string) => any; id: any; }) => {
            const onClick = () => {
                const [isUpdateModelOpen, setUpdateModelOpen] = useState(false);
                const evntApi = new EventApi();
                const api: GridApi = params.api;
                const fields = api
                    .getAllColumns()
                    .map((c) => c.field)
                    .filter((c) => c !== "__check__" && !!c);
                const thisRow: any = {};

                fields.forEach((f) => {
                    thisRow[f] = params.getValue(params.id, f);
                });

                const updateEventForInstitute = async (model: InstituteEventModel) => {
                    const messageResponse = await evntApi.addEventToInstitutionUser(model);
                    console.log(messageResponse);
                    if (messageResponse.messageType === MessageType.SUCCESS) {
                        toast.success(messageResponse.message);
                        setUpdateModelOpen(false);
                    } else {
                        toast.error(messageResponse.message);
                    }
                }

                //alert(JSON.stringify(thisRow, null, 4));
                setUpdateModelOpen(true);
                return <UpdateEventForm isOpen={isUpdateModelOpen} handleClose={() => setUpdateModelOpen(false)} updateEventForInstitute={} currentInstitutionId={} initialEvent={}/>
            };

            return <Button onClick={onClick}>Click</Button>;
        }
    }
];

interface Props {
    events: EventQueryResponse[]
    fetchUsersForEvent: (eventId: String) => void
}

export function EventListForInstitution(props: Props) {
    console.log(props.events)
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid columns={tableColumns} rows={props.events} pageSize={5}
                      onRowSelected={(newSelection) => {
                          var eventId = (newSelection.data.id).toString();
                          console.log(eventId);
                          return props.fetchUsersForEvent(eventId);
                      }}/>
        </div>
    );
}