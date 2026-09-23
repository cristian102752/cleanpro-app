export type RootTabParamList = {
  Servicios: undefined;
  Clientes: undefined;
  Personal: undefined;
  Agenda: undefined;
  Favoritos: undefined;
  Settings: undefined;
};
export type ServicesStackParamList = {
  ServicesList: undefined;
  ServiceDetail: { id: string; name: string };
  CreateService: undefined;
  EditService: { id: string; name: string };
};
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};