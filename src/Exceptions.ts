export interface Exception {
  message: string
}

export class ClientException implements Exception {
  constructor(public message: string) {}
}

export class ServerException implements Exception {
  constructor(public message: string) {}
}
