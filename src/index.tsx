import { NativeModules } from 'react-native';

type ServiceModuleType = {
  initService(): void;
};

const { ServiceModule } = NativeModules;

export default ServiceModule as ServiceModuleType;
