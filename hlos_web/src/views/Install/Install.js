import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import AnsibleApiDataService from "../../services/ansible-api.service.js";

// Styling of the cards
//-------------------------------------------
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
const useStyles = makeStyles(styles);

// The component doing it all.
//-------------------------------------------
export default function Install() {
  // Styling
  const classes = useStyles();

  // Initial state using React Hooks: [variable, setter function] = ... (initial value)
  const [hostip, setHostIP] = React.useState("");
  const [domain, setDomain] = React.useState("");
  const [timezone, setTimezone] = React.useState("");
  const [user, setUser] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [select_dashboard, setSelectDashboard] = React.useState('sui');

  // onchange handler functions
  const onChangeHostIP = (event) => {
    setHostIP(event.target.value);
  };

  const onChangeDomain = (event) => {
    setDomain(event.target.value);
  };

  const onChangeUser = (event) => {
    setUser(event.target.value);
  };

  const onChangePass = (event) => {
    setPass(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeTimezone = (event) => {
    setTimezone(event.target.value);
  };

  const onChangeSelectDashboard = (event) => {
    setSelectDashboard(event.target.value);
  };

  const onClickInstall = () => {
    // Two things are made here:
    // 1. Configure - create the default config files based on the input given here.
    // 2. Deploy    - install the remaining system dependencies and Traefik.

    // Clear resopnse areas
    setApiResponse("");
    setApiResponseError("");

    AnsibleApiDataService.createConfiguration(
      hostip,
      domain,
      timezone,
      user,
      pass,
      email,
      handleApiResponse,
      handleApiError
    );

    AnsibleApiDataService.encryptVault(
      handleApiResponse,
      handleApiError
    );

    // Set dashboard
    AnsibleApiDataService.setServiceProperty(
      "sui.enable",
      (select_dashboard === "sui" ? "true" : "false"),
      handleApiResponse,
      handleApiError
    );

    AnsibleApiDataService.setServiceProperty(
      "heimdall.enable",
      (select_dashboard === "heimdall" ? "true" : "false"),
      handleApiResponse,
      handleApiError
    );

    AnsibleApiDataService.setServiceProperty(
      "organizr.enable",
      (select_dashboard === "organizr" ? "true" : "false"),
      handleApiResponse,
      handleApiError
    );

    // Finally deploy the system and start services
    AnsibleApiDataService.deploySystem(handleApiResponse, handleApiError);
    AnsibleApiDataService.deployService(handleApiResponse, handleApiError);
  };

  // Getting feedback from the service layer - rough but workable for now
  // ----------------------------------------------------------------------
  const [apiresponse, setApiResponse] = React.useState("");
  const [apiresponseerror, setApiResponseError] = React.useState("");
  // Declaration of references to the DOM elements (textareas) used for feedback.
  // We need these to be able to append to the text in them when the callbacks
  // are used from the Ansible API functions.
  const apiresponse_ref = React.useRef(null);
  const apiresponseerror_ref = React.useRef(null);

  const handleApiResponse = (data) => {
    setApiResponse(apiresponse_ref.current.defaultValue+"\n"+data);
  };

  const handleApiError = (data) => {
    setApiResponseError(apiresponseerror_ref.current.defaultValue+"\n"+data);
  };

var debugAreas = (
    <GridItem  xs={6} sm={6} md={6}>
      <Card>
        <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Server Response</h4>
            <p className={classes.cardCategoryWhite}>Results and errors</p>
        </CardHeader>
        <CardBody>
          <div>
            <br />
            <label htmlFor="apiresponse">API Response</label><br></br>
            <textarea
              value={apiresponse}
              name="apiresponse"
              style={{ width: '100%', height: 200+'px' }}
              ref={apiresponse_ref}
              readOnly

            />
          </div>
          <div>
            <label htmlFor="apiresponseerror">API Response Errors</label><br></br>
            <textarea
              value={apiresponseerror}
              name="apiresponseeror"
              style={{ width: '100%', height: 100+'px' }}
              ref={apiresponseerror_ref}
              readOnly
            />
          </div>
        </CardBody>
      </Card>
    </GridItem>
  );

  // The component render result
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h2>Welcome to HomelabOS Configuration</h2>
            </CardHeader>
            <CardBody>
              Before you can deploy services on your new system, we need a few bits and pieces of information.
              To get here you already succeeded in setting up a specific user account on your server,
              from which you already run the web service.  You have a set of SSH keys and an Ansible vault password in the
              user account you used to setup the HomelabOS system.  Please back up these files, as it is the
              only way to login to the HomelabOS user account.
              <br></br>
              To complete the installation you need to provide some information below. When ready press the buttons below.
              <br></br>
              After you press the "Configure HomelabOS" button you will see the message "Start HomelabOS Traefik" in the
              API reponse window.  This should be the signal for you to continue to the Service screen.
              <br></br>
              Note: If you don't see this message, please press the Configure button again :-)
              <br></br>
              When installation reports back everything went well, you should visit <a href={ `http://traefik.${domain}:8181` }>your new Traefik container</a>
              <br></br>
              Please note this is a very rough initial web UI, just functional enough to allow you to configure, and get services running.  Don't expect a very polished experience at this point in time.
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Configure HomelabOS</h4>
              <p className={classes.cardCategoryWhite}>Enter server details</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Server IP"
                    id="server-ip"
                    inputProps={{
                      required: true,
                      autoFocus: true,
                      onChange: onChangeHostIP
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Server Domain"
                    id="server-domain"
                    inputProps={{
                      required: true,
                      onChange: onChangeDomain
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Server Timezone"
                    id="server-timezone"
                    inputProps={{
                      required: true,
                      onChange: onChangeTimezone
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Defalt Username"
                    id="default-user"
                    inputProps={{
                      required: true,
                      onChange: onChangeUser
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Default User Password"
                    id="default-pass"
                    inputProps={{
                      required: true,
                      type: 'password',
                      onChange: onChangePass
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Server Admin Email"
                    id="default-email"
                    inputProps={{
                      required: true,
                      onChange: onChangeEmail
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem><br></br>
                  <FormLabel>Select your dashboard</FormLabel>
                  <RadioGroup aria-label="select-dashboard" name="select-dashboard" value={select_dashboard} onChange={onChangeSelectDashboard}>
                    <FormControlLabel value="sui" control={<Radio />} label="SUI" />
                    <FormControlLabel value="heimdall" control={<Radio />} label="Heimdall" />
                    <FormControlLabel value="organizr" control={<Radio />} label="Organizr" />
                  </RadioGroup>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="success" onClick={onClickInstall}>Finish Installation</Button>
            </CardFooter>
          </Card>
        </GridItem>
        {debugAreas}
      </GridContainer>
    </div>
  );
}
