import {DataGrid} from "@material-ui/data-grid";
import {UserQueryResponse} from "../../externalUser/api/EventApi";

const tableColumns = [
    {field: "id", headerName: "ID", width: 120},
    {field: "firstName", headerName: "FIRSTNAME", width: 250},
    {field: "lastName", headerName: "LASTNAME", width: 250},
    {field: "tcKimlikNumber", headerName: "TCKIMLIKNUMBER", width: 250}
];

interface Props {
    users: UserQueryResponse[]
}

export function ExternalUsersList(props: Props) {
    console.log(props.users)
    return (
        <div style={{height: 400, width: '100%'}}>
            <DataGrid columns={tableColumns} rows={props.users} pageSize={5}/>
        </div>
    );
}