import {DataGrid} from "@material-ui/data-grid";
import {UserQueryResponse} from "../../externalUser/api/EventApi";
import Grid from "@material-ui/core/Grid";


const tableColumns = [
    {field: "id", headerName: "ID", width: 100},
    {field: "firstName", headerName: "FIRSTNAME", width: 200},
    {field: "lastName", headerName: "LASTNAME", width: 200},
    {field: "tcKimlikNumber", headerName: "TCKNUMBER", width: 200}
];

interface Props {
    users: UserQueryResponse[]
}

export function ExternalUsersList(props: Props) {
    console.log(props.users)
    return (
        <div title="Users of Selected Event" style={{height: 400, width: '100%', flexGrow: 1}}>
            <h1>Users of Selected Event</h1>
            <DataGrid columns={tableColumns} rows={props.users} pageSize={5}/>
        </div>
    );
}