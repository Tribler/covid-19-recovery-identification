import { NativeModules } from 'react-native';

type Ipv8ServiceType = {
  initService(): void;
};

const { ServiceModule } = NativeModules;

export default ServiceModule as Ipv8ServiceType;
