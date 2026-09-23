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

export type AgendaStackParamList = {
  AgendaList: undefined;
  AgendaDetail: { id: string };
};

// Auth (Semana 08)
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
