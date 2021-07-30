import {imageItems} from "../ExternalUserView";
import {ImageList, ImageListItem, ImageListItemBar, ListSubheader} from "@material-ui/core";
import classes from "*.module.css";
import {makeStyles} from "@material-ui/core/styles";
import {Dispatch, SetStateAction} from "react";

interface Props {
    itemData: imageItems[]
    setEventModelOpen: Dispatch<SetStateAction<boolean>>
    isEventModelOpen: boolean
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: 450,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function ShowImages(props: Props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ImageList rowHeight={180} className={classes.imageList}>
                <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Enrolled Events</ListSubheader>
                </ImageListItem>

                {props.itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img src={item.img} alt={item.title} onClick={() => props.setEventModelOpen(true)}/>
                        <ImageListItemBar
                            title={item.title}
                            subtitle={<span>by: {item.author}</span>}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}