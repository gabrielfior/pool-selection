export class UserHoldingDTO {
  constructor(private email: string, private pool_address: string) {}
}

export class UserHoldingUSDDTO {
  constructor(
    private email: string,
    private userHoldingUSD: number,
    private isMainUser: boolean
  ) {}
}
