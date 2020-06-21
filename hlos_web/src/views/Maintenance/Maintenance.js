import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

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
export default function Maintenance(props) {
  // Styling
  const classes = useStyles();

  // Initial state using React Hooks: [variable, setter function] = ... (initial value)
//  const [hostip, setHostIP] = React.useState(AnsibleApiDataService.hostip);
  const [hostip, setHostIP] = React.useState(props.state.restore().hostip);

  // onchange handler functions
  const onChangeHostIP = (event) => {
    setHostIP(event.target.value);
    props.state.save("hostip", event.target.value)
  };

  const onClickButton = (id) => {
    console.log("ServiceButton clicked:", id);
    AnsibleApiDataService.setBaseURL(hostip);
    switch(id) {
      case "decrypt":
        AnsibleApiDataService.decryptVault(handleApiResponse, handleApiError);
        break;
      case "encrypt":
        AnsibleApiDataService.encryptVault(handleApiResponse, handleApiError);
        break;
      case "check_api":
        AnsibleApiDataService.getApi(handleApiResponse, handleApiError);
        break;
      default:
        break;
    }
  };

  // Getting feedback from the service layer - rough but workable for now
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
              <h2>HomelabOS Maintenance</h2>
            </CardHeader>
            <CardBody>
              Here you can decrypt and encrypt your ansible vault from the web UI.
              You can also check if the HomelabOS Ansible API is running.
              <br></br>
              In the future there may come more maintenance tasks in this place.
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Server IP Address</h4>
              <p className={classes.cardCategoryWhite}>The HomelabOS server to contact</p>
            </CardHeader>
            <CardBody>
                  <CustomInput
                    labelText="Server IP"
                    id="server-ip"
                    inputProps={{
                      required: true,
                      autoFocus: false,
                      onChange: onChangeHostIP,
                      defaultValue: hostip
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
            </CardBody>
          </Card>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Check for API availability</h4>
              <p className={classes.cardCategoryWhite}>Enter service details</p>
            </CardHeader>
            <CardBody>
              <Button color="success" id="check_api" onClick={() => onClickButton("check_api")}>Check API</Button>
            </CardBody>
          </Card>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>En/Decrypt Ansible Vault</h4>
              <p className={classes.cardCategoryWhite}>The secrets on your server</p>
            </CardHeader>
            <CardBody>
              <Button color="success" id="decrypt" onClick={() => onClickButton("decrypt")}>Decrypt</Button>
              <Button color="success" id="encrypt" onClick={() => onClickButton("encrypt")}>Encrypt</Button>
            </CardBody>
          </Card>
        </GridItem>
        {debugAreas}
      </GridContainer>
    </div>
  );
}
