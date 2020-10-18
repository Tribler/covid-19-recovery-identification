import { NativeModules } from 'react-native';

type Ipv8ServiceType = {
  multiply(a: number, b: number): Promise<number>;
};

const { Ipv8Service } = NativeModules;

export default Ipv8Service as Ipv8ServiceType;
