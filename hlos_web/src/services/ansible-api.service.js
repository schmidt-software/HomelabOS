import http from "services/http-common";
import sha256 from "sha256";

class AnsibleApiDataService {
  hostip = "";
  api_key = "secret";

  constructor() {
    // Set default host IP from environment if it is defined.
    if(process.env.REACT_APP_HOST_IP !== undefined) {
      this.hostip = process.env.REACT_APP_HOST_IP;
    }
  }

  hasHostIpFromEnv() {
    // Return bool on host IP available from environment variable
    if(process.env.REACT_APP_HOST_IP !== undefined) {
      return true;
    }
    return false;
  }

  hasHostIp() {
    return (this.hostip !== "");
  }

  /* Format a response structure into a pretty format for use in the UI.
     Returns a string {"<changed> <name>\n"}+
  */
  formatResponse(response) {
    // Do some pretty printing - it is the responsibility of the interface to know the return data formatting
    // Format of returned data for "playbook" runs:
    //   response.{url, method, data, header, request status, statusText}
    //   response.data.{rc, detail}
    //   response.data.detail[<host-IP>].[...]
    //   response.data.detail["127.0.0.1"][0].{changed, host, name, pid, rc runner_ident, task_name, uuid}
    // The interesting bits for feedback is the 'name' and 'changed' properties
    //
    // Format of returned data for "command" runs:
    //   response.{url, method, data, header, request status, statusText}
    //   response.data.{rc, detail}
    //   response.data.detail[<host-IP>].[...]
    //   response.data.detail["127.0.0.1"][0].{changed, cnd, host, name, pid, rc runner_ident, stderr, stdout, task_name, uuid}
    // The interesting bits for feedback is the 'stdout' and 'changed' properties
    if(response.data.detail !== undefined) {
      let fmt_text = "";
      Object.keys(response.data.detail).forEach(host => {
        response.data.detail[host].forEach(line => {
          fmt_text += (line.changed ? "Updated  ":"Unchanged") + " - " + (line.stdout !== undefined ? line.stdout+line.stderr : line.task_name) + "\n";
        });
      });
      return fmt_text;
    } else {
      return "";
    }
  }

  setBaseURL(hostip) {
    this.hostip = hostip;
    http.defaults.baseURL="http://"+hostip+":8765/"
  }

  getApi(resultCallback, errorCallback) {
    http.get(`/`).then(response => {
      console.log("getApi response:", response);
      if (typeof resultCallback === 'function') resultCallback(response.data.message);
    })
    .catch(e => {
      console.log("getApi error:", e);
      if (typeof errorCallback === 'function') errorCallback(e);
    });
  }

  /* This is the very first function to call.  It installs the initial configuration on the server */
  createConfiguration(hostip, domain, timezone, defaultuser, defaultpass, admin_email, resultCallback, errorCallback) {
    let n="config#id@hlos";
    let f="playbook.config.yml";
    let s=sha256(n+hostip+f+this.api_key);
    let data = {
      'n':n,
      'h':hostip,
      'f':f,
      's':s,
      'v_homelab_ip':hostip,
      'v_homelab_ssh_user':'hlos',
      'v_ansible_become_password':'',
      'v_default_username':defaultuser,
      'v_default_password':defaultpass,
      'v_domain':domain,
      'v_admin_email':admin_email,
      'v_volumes_root':'/home/hlos',
      'v_common_timezone':timezone
    };

    if(this.hostip === "") this.setBaseURL(hostip);

    http.post("/playbook", data).then(response => {
      console.log("createConfiguration response:", response);
      if (typeof resultCallback === 'function') resultCallback(this.formatResponse(response));
    })
    .catch(e => {
      console.log("createConfiguration error:", e);
      if (typeof errorCallback === 'function') errorCallback(e);
    });
  }

  encryptVault(resultCallback, errorCallback) {
    this.cryptVault("encrypt", resultCallback, errorCallback);
  }

  decryptVault(resultCallback, errorCallback) {
    this.cryptVault("decrypt", resultCallback, errorCallback);
  }

  cryptVault(crypt_mode, resultCallback, errorCallback) {
    let n=crypt_mode+"-vault#id@hlos";
    let m="command";
    let a="docker exec ansible_api_ansible-api_1 ansible-vault "+crypt_mode+" /playbooks/settings/vault.yml";
    let s=sha256(n+m+this.hostip+this.api_key);
    let data = {
      "n":n,
      "m":m,
      "a":a,
      "t":this.hostip,
      "s":s
    };
    http.post("/command", data).then(response => {
      console.log("cryptVault reponse:", response);
      if (typeof resultCallback === 'function') resultCallback(this.formatResponse(response));
    })
    .catch(e => {
      console.log("cryptVault error:", e);
      if (typeof errorCallback === 'function') errorCallback(e);
    });
  }

  deploySystem(resultCallback, errorCallback) {
    let n="deploy_host_deps#id@hlos"
    let f="playbook.homelabos_api.yml"
    let s=sha256(n+this.hostip+f+this.api_key);
    let data = {
      "n":n,
      "h":this.hostip,
      "f":f,
      "s":s,
      "e":"/playbooks/settings/config.yml",
      "c_cmd1":"-e \"@/playbooks/settings/vault.yml\"",
      "c_cmd2":"--tags deploy_host_deps"
    }
    http.post("/playbook", data).then(response => {
      console.log("deploySystem response:", response);
      if (typeof resultCallback === 'function') resultCallback(this.formatResponse(response));
    })
    .catch(e => {
      console.log("deploySystem error:", e);
      if (typeof errorCallback === 'function') errorCallback(e);
    });
  }

  setServiceProperty(service_property, value, resultCallback, errorCallback) {
    let n="set_setting#id@hlos";
    let m="shell";
    let a="cd install && ./bootstrap_install/set_setting.sh "+service_property+" "+value;
    let s=sha256(n+m+this.hostip+this.api_key);

    let data = {
      "n":n,
      "m":m,
      "a":a,
      "t":this.hostip,
      "s":s
    };
    http.post("/command", data).then(response => {
      console.log("cryptVault reponse:", response);
      if (typeof resultCallback === 'function') resultCallback(this.formatResponse(response));
    })
    .catch(e => {
      console.log("cryptVault error:", e);
      if (typeof errorCallback === 'function') errorCallback(e);
    });
  }

  deployService(resultCallback, errorCallback) {
    let n="deploy#id@hlos";
    let f="playbook.homelabos_api.yml"
    let s=sha256(n+this.hostip+f+this.api_key);

    let data = {
      "n":n,
      "h":this.hostip,
      "f":f,
      "s":s,
      "e":"/playbooks/settings/config.yml",
      "c_cmd1":"-e \"@/playbooks/settings/vault.yml\"",
      "c_cmd2":"--tags deploy_service"
    }
    http.post("/playbook", data).then(response => {
      console.log("deployService response:", response);
      if (typeof resultCallback === 'function') resultCallback(this.formatResponse(response));
    })
    .catch(e => {
      console.log("deployService error:", e);
      if (typeof errorCallback === 'function') errorCallback(e);
    });
  }

  /* OLD functions which does not handle the promise .then .catch */
  getApiPromise() {
    return http.get(`/`);
  }

  createConfigurationPromise(hostip, domain, timezone, defaultuser, defaultpass, admin_email) {
    let n="config#id@hlos";
    let f="playbook.config.yml";
    let s=sha256(n+hostip+f+this.api_key);
    let data = {
      'n':n,
      'h':hostip,
      'f':f,
      's':s,
      'v_homelab_ip':hostip,
      'v_homelab_ssh_user':'hlos',
      'v_ansible_become_password':'',
      'v_default_username':defaultuser,
      'v_default_password':defaultpass,
      'v_domain':domain,
      'v_admin_email':admin_email,
      'v_volumes_root':'/home/hlos',
      'v_common_timezone':timezone
   };
   return http.post("/playbook", data);
  }

  cryptVaultPromise(crypt_mode) {
    let n=crypt_mode+"-vault#id@hlos";
    let m="command";
    let a="docker exec ansible_api_ansible-api_1 ansible-vault "+crypt_mode+" /playbooks/settings/vault.yml";
    let s=sha256(n+m+this.hostip+this.api_key);
    let data = {
      "n":n,
      "m":m,
      "a":a,
      "t":this.hostip,
      "s":s
    };
    return http.post("/command", data);
  }

  setServicePropertyPromise(service_property, value) {
    let n="set_setting#id@hlos";
    let m="shell";
    let a="cd install && ./bootstrap_install/set_setting.sh "+service_property+" "+value;
    let s=sha256(n+m+this.hostip+this.api_key);

    let data = {
      "n":n,
      "m":m,
      "a":a,
      "t":this.hostip,
      "s":s
    };
    console.log(data);
    return http.post("/command", data);
  }

  deploySystemPromise() {
    let n="deploy_host_deps#id@hlos"
    let f="playbook.homelabos_api.yml"
    let s=sha256(n+this.hostip+f+this.api_key);
    let data = {
      "n":n,
      "h":this.hostip,
      "f":f,
      "s":s,
      "e":"/playbooks/settings/config.yml",
      "c_cmd1":"-e \"@/playbooks/settings/vault.yml\"",
      "c_cmd2":"--tags deploy_host_deps"
    }
    return http.post("/playbook", data);
  }

  deployServicePromise() {
    let n="deploy#id@hlos";
    let f="playbook.homelabos_api.yml"
    let s=sha256(n+this.hostip+f+this.api_key);

    let data = {
      "n":n,
      "h":this.hostip,
      "f":f,
      "s":s,
      "e":"/playbooks/settings/config.yml",
      "c_cmd1":"-e \"@/playbooks/settings/vault.yml\"",
      "c_cmd2":"--tags deploy_service"
    }
    return http.post("/playbook", data);
  }

} // class

export default new AnsibleApiDataService();
