import {SetupService} from "./lib/setup/SetupService";

a().then(() => console.log('Success'))
   .catch(e => console.error(e));

async function a() {
  const setupService = new SetupService();
  await setupService.init();
  await setupService.setup({domain: 'test'});
}