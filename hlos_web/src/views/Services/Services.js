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
//import CardFooter from "components/Card/CardFooter.js";

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
export default function Services(props) {
  // Styling
  const classes = useStyles();

  // Initial state using React Hooks: [variable, setter function] = ... (initial value)
  const [hostip, setHostIP] = React.useState(props.state.restore().hostip);
  const [service, setService] = React.useState("");
  const [service_property, setServiceProperty] = React.useState("");
  const [service_value, setServiceValue] = React.useState("");

  // onchange handler functions
  const onChangeHostIP = (event) => {
    setHostIP(event.target.value);
    props.state.save("hostip", event.target.value)
  };

  const onChangeService = (event) => {
    setService(event.target.value);
  };

  const onChangeServiceProperty = (event) => {
    setServiceProperty(event.target.value);
  };

  const onChangeServiceValue = (event) => {
    setServiceValue(event.target.value);
  };

  const onClickButton = (id) => {
    console.log("ServiceButton clicked:", id);
    AnsibleApiDataService.setBaseURL(hostip);
    switch(id) {
      case "enable":
        AnsibleApiDataService.setServiceProperty(service+".enable", "true", handleApiResponse, handleApiError);
        break;
      case "disable":
        AnsibleApiDataService.setServiceProperty(service+".enable", "false", handleApiResponse, handleApiError);
        break;
      case "set":
        AnsibleApiDataService.setServiceProperty(service+"."+service_property, service_value, handleApiResponse, handleApiError);
        break;
      case "deploy":
        AnsibleApiDataService.deployService(handleApiResponse, handleApiError);
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
              <h2>HomelabOS Service Selection</h2>
            </CardHeader>
            <CardBody>
              Here you can activate services, and/or set properties on the services.  If you just want to enable
              a service, like 'portainer', simply write 'portainer' in the service field, and click the Enable
              button below.  Disabling is the same, just click the Disable button instead.
              <br></br>
              When you are ready, click the Deploy button to activate your choices.
              <br></br>
              The very first time yoy press the deploy button, you get Traefik started as well.
              <br></br>
              Please note this is a very rough initial web UI, just functional enough to allow you to configure,
              and get services running.  Don't expect a very polished experience at this point in time.
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={6} sm={6} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Setup a Service</h4>
              <p className={classes.cardCategoryWhite}>Enter service details</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
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
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Service name"
                    id="service"
                    inputProps={{
                      required: true,
                      onChange: onChangeService,
                      autoFocus: (AnsibleApiDataService.hasHostIp() ? true : false)
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Service Property"
                    id="service-property"
                    inputProps={{
                      required: false,
                      onChange: onChangeServiceProperty
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Value"
                    id="service-value"
                    inputProps={{
                      required: false,
                      onChange: onChangeServiceValue
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Button color="success" id="enable"  onClick={() => onClickButton("enable")}>Enable Service</Button>
              <Button color="success" id="disable" onClick={() => onClickButton("disable")}>Disable Service</Button>
              <Button color="success" id="set"     onClick={() => onClickButton("set")}>Set Property</Button>
              <Button color="success" id="deploy"  onClick={() => onClickButton("deploy")}>Deploy New Settings</Button>
            </CardBody>
          </Card>
        </GridItem>
        {debugAreas}
      </GridContainer>
    </div>
  );
}
