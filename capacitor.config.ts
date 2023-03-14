import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'chat.app.chati',
  appName: 'სეკრეტ ჩატი',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url:"https://nikaschatapp.netlify.app"
  }
};

export default config;
