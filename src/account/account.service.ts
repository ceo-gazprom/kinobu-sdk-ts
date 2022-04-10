import { Service, Inject } from 'typedi';
import { CLIENT_SERVICE, IClientService } from '../client';
import type { IAccount, IChangePassword, ISignInAccountResponse, ISignInAccountDto, ISignUpAccountDto } from './interfaces';

@Service()
export class AccountService {
  constructor(
    @Inject(CLIENT_SERVICE)
    private readonly clientService: IClientService
  ) {}

  public async signIn(signInAccountData: ISignInAccountDto): ISignInAccountResponse {
    const result = this.clientService.post('v1/account/signin', signInAccountData);
  }

  public signUp(signUpAccountData: ISignUpAccountDto): IAccount {
    // method post
  }

  public verifyEmail(token: string): Promise<void> {}

  public resendEmailVerification(): Promise<void> {}
  

  public changePassword(changePasswordData: IChangePassword): Promise<void>

  // Todo: @Get('email/forgot-password/:email')
  // Todo: @Post('email/reset-password')
}
