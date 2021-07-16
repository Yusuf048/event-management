import {DataGrid} from "@material-ui/data-grid";
import {EventQueryResponse} from "../api/EventApi";

const tableColumns = [
    {field: "id", headerName: "ID", width: 120},
    {field: "name", headerName: "NAME", width: 250},
    {field: "startDate", headerName: "STARTDATE", width: 250},
    {field: "endDate", headerName: "ENDDATE", width: 250},
    {field: "eventQuota", headerName: "EVENTQUOTA", width: 250}
];

interface Props {
    events: EventQueryResponse[]
}

export function EventList(props: Props) {
    console.log(props.events)
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid columns={tableColumns} rows={props.events} pageSize={5}/>
        </div>
    );
}