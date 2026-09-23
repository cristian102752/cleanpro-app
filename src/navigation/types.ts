export type RootTabParamList = {
  Servicios: undefined;
  Clientes: undefined;
  Personal: undefined;
  Agenda: undefined;
  Favoritos: undefined;
};

export type ServicesStackParamList = {
  ServicesList: undefined;
  ServiceDetail: { id: string; name: string };
  CreateService: undefined;
  EditService: { id: string; name: string };
};
