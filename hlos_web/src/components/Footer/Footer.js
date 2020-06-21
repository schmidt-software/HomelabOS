/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://homelabos.com/" className={classes.block}
                target="_blank"
              >
                HomelabOS Home
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://homelabos.com/docs/" className={classes.block}
                target="_blank"
              >
                Documentation
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://homelabos.com/docs/development/contributing/" className={classes.block}
                target="_blank"
              >
                Contribute
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://homelabos.zulipchat.com" className={classes.block}
                target="_blank"
              >
                Join us on Zulip
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            UI built by kpoppel, based on&nbsp;
            <a
              href="https://github.com/creativetimofficial/material-dashboard-react"
              target="_blank"
              className={classes.a}
            >
              material-dashboard-react
            </a>
            .
          </span>
        </p>
      </div>
    </footer>
  );
}
