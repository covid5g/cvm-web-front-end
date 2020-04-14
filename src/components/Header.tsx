import React from "react";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from '@material-ui/icons/Home';
import {Link} from "react-router-dom";

// noinspection TypeScriptValidateJSTypes
const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250
    }
}));

const Header: React.FC = () => {
    const classes = useStyles();
    const [isOpen, setIsOpen] = React.useState(false);

    const closeDrawer = () => {
        setIsOpen(false);
    };
    const openDrawer = () => {
        setIsOpen(true)
    };

    return <AppBar position="static">
        <Toolbar>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={openDrawer}
            >
                <MenuIcon/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                Covid 5G
            </Typography>
        </Toolbar>
        <Drawer open={isOpen} onClose={closeDrawer}>
            <List className={classes.list}>
                <ListItem component={Link} to={"/"} button onClick={closeDrawer}>
                    <ListItemIcon><HomeIcon/></ListItemIcon>
                    <ListItemText primary={"Home"}/>
                </ListItem>
            </List>
        </Drawer>
    </AppBar>
};

export default Header;