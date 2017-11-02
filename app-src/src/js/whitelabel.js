import LoggingService from 's2s-logging-service';
const data = require("./whitelabelData.js");

export default class WhiteLabel {
  static get(id) {
    if (data[id]) {
      return data[id];
    } else {
      LoggingService.getInstance().error(`Missing Key ${id} from whitelabel.json`);
    }
  }
}
