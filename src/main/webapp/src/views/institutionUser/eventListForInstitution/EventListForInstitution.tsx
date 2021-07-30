import {DataGrid, GridApi} from "@material-ui/data-grid";
import {useState} from "react";
import {EventApi, EventQueryResponse} from "../../externalUser/api/EventApi";
import {Button} from "@material-ui/core";
import {UpdateEventForm} from "../updateEventForm/UpdateEventForm";
import {InstituteEventModel} from "../addEventToInstitute/AddEventToInstitute";
import {MessageType} from "../../../common/dto/MessageResponse";
import {toast} from "react-toastify";
import {render} from "react-dom";

const tableColumns = [
    {field: "id", headerName: "ID", width: 100},
    {field: "name", headerName: "NAME", width: 250},
    {field: "startDate", headerName: "STARTDATE", width: 220},
    {field: "endDate", headerName: "ENDDATE", width: 220},
    {field: "eventQuota", headerName: "EVENTQUOTA", width: 200},
    {field: "updateEvent", width: 200,
        headerName: "UPDATEEVENT",
        disableClickEventBubbling: true,
        renderCell: (params: { api: GridApi; getValue: (arg0: any, arg1: string) => any; id: any; }) => {
            const onClick = () => {
                //let isUpdateModelOpen = true;
                //const [isUpdateModelOpen, setUpdateModelOpen] = useState(false);

                const api: GridApi = params.api;
                const fields = api
                    .getAllColumns()
                    .map((c) => c.field)
                    .filter((c) => c !== "__check__" && !!c);
                const thisRow: any = {};

                fields.forEach((f) => {
                    thisRow[f] = params.getValue(params.id, f);
                });

                //alert(JSON.stringify(thisRow, null, 4));
            };

            return <Button onClick={onClick}>Double Click</Button>;
        }
    }
];

interface Props {
    events: EventQueryResponse[]
    fetchUsersForEvent: (eventId: String) => void
    fetchEvents: () => void
}

export function EventListForInstitution(props: Props) {
    const [isUpdateModelOpen, setUpdateModelOpen] = useState(false);
    const evntApi = new EventApi();
    let userDetails = JSON.parse(localStorage.getItem('user') as string);

    const updateEventForInstitute = async (model: InstituteEventModel) => {
        console.log(model);
        const messageResponse = await evntApi.updateEvent(model);
        console.log(messageResponse);
        if (messageResponse.messageType === MessageType.SUCCESS) {
            toast.success(messageResponse.message);
            setUpdateModelOpen(false);
            props.fetchEvents();
        } else {
            toast.error(messageResponse.message);
        }
    }

    const [currEvent, setCurrEvent] = useState<InstituteEventModel>({
        name: "",
        startDate: "",
        endDate: "",
        eventQuota: "",
        creatorInstId: 0
    });
    var currentEvent: InstituteEventModel;
    currentEvent = {
        name: "",
        startDate: "",
        endDate: "",
        eventQuota: "",
        creatorInstId: 0
    };

    console.log(props.events)
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid columns={tableColumns} rows={props.events} pageSize={5}
                      onRowSelected={(newSelection) => {
                          var eventId = (newSelection.data.id).toString();
                          console.log(eventId);
                          return props.fetchUsersForEvent(eventId);
                      }}
                      onCellDoubleClick={(selectedCell) => {
                          if(selectedCell.field == "updateEvent") {
                              const api: GridApi = selectedCell.api;
                              const fields = api
                                  .getAllColumns()
                                  .map((c) => c.field)
                                  .filter((c) => c !== "__check__" && !!c);
                              const thisRow: any = {};

                              fields.forEach((f) => {
                                  thisRow[f] = selectedCell.getValue(selectedCell.id, f);
                              });

                              currentEvent.name = thisRow.name;
                              currentEvent.startDate = thisRow.startDate;
                              currentEvent.endDate = thisRow.endDate;
                              currentEvent.eventQuota = thisRow.eventQuota;

                              currentEvent.creatorInstId = userDetails.id;
                              console.log(currentEvent);
                              setCurrEvent(currentEvent);
                              setUpdateModelOpen(true);
                          }
                      }}
            />
            <UpdateEventForm isOpen={isUpdateModelOpen} handleClose={() => setUpdateModelOpen(false)} updateEventForInstitute={updateEventForInstitute} currentInstitutionId={userDetails.id} initialEvent={currEvent}/>

        </div>
    );
}