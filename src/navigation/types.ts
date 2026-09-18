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
};

export type AgendaStackParamList = {
  AgendaList: undefined;
  AgendaDetail: { id: string };
};
