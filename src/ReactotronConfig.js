import Reactotron, { trackGlobalErrors } from "reactotron-react-native";
import apisaucePlugin from "reactotron-apisauce";

import { NativeModules } from "react-native";

let scriptHostname;
console.log = Reactotron.log;
const scriptURL = NativeModules.SourceCode.scriptURL;
scriptHostname = scriptURL.split("://")[1].split(":")[0];

Reactotron.configure({ host: scriptHostname })
  .use(apisaucePlugin({}))
  .use(trackGlobalErrors())
  .useReactNative({ storybook: true })
  .connect();
