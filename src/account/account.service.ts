import { Service, Inject } from 'typedi';
import { CLIENT_SERVICE, IClientService } from '../client';
import type { ISignInAccountResponse, ISignInAccountDto, ISignUpAccountDto } from './interfaces'

@Service()
export class AccountService {
  constructor(
    @Inject(CLIENT_SERVICE)
    private readonly clientService: IClientService
  ) {}

  private readonly apiPath = 'account';
  private readonly apiCurrentVersion = '1';

  public signIn(signInAccountDto: ISignInAccountDto): ISignInAccountResponse {
    // method post
  }

  public signUp(signUpAccountDto: ISignUpAccountDto) {
    // method post
  }

}



  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create a new account',
    type: AccountDto,
  })
  public async signUp(
    @RequestIP() ip: string,
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<AccountDto> {
    /**
     * Check if the password matches other account data
     */
    if (this.accountService.checkPasswordMatchAccountData(createAccountDto)) {
      throw new PasswordSameDataExceptionFilter();
    }

    const { username, email, mobilePhone, password } = createAccountDto;
    /**
     * Check if such name is used
     */
    if (await this.accountService.checkUsernameExist(username)) {
      throw new UsernameExistExceptionFilter();
    }

    /**
     * Check if such email is used
     */
    if (await this.accountService.checkEmailExist(email)) {
      throw new EmailExistExceptionFilter();
    }

    /**
     * Check if such phone number is used
     * Todo: убрать проверку наличия телефона после реализации регистрации по email
     */
    if (await this.accountService.checkPhoneNumberExist(mobilePhone)) {
      throw new PhoneNumberExistExceptionFilter();
    }

    // /**
    //  * Check if the password matches the requirement
    //  */
    // const checkPasswordResult =
    //   await this.accountService.checkPasswordMeetsRequirements(password);
    // if (checkPasswordResult.length > 0) {
    //   throw new PasswordNotMeetRequirementExceptionFilter(checkPasswordResult);
    // }

    const createAccountData = { ip, ...createAccountDto };
    /**
     * Create new account
     */
    const newAccount = await this.accountService.createAccount(
      createAccountData,
    );

    return AccountDto.fromEntity(newAccount);
  }

  // Todo: если код уже отправлялся, сгенерировать новый
  // Todo: блокировать после 6 попыток
  // Todo: если код протух, отправить на страницу логина

  @Get('email/verify/:token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async verifyEmail(@Param('token') token: string): Promise<void> {
    // return this.authService.login(authLoginDto);
  }

  @Get('email/resend-verification/:email')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async resendConfirmEmail(
    @Param('email') email: string,
  ): Promise<void> {
    // return this.authService.login(authLoginDto);
  }

  // Todo: @Get('email/forgot-password/:email')
  // Todo: @Post('email/reset-password')

  //     @Post('register')
  // public async register(@Body() createUserDto: CreateUserDto,  ): Promise<RegistrationStatus> {
  //     const result:
  //     RegistrationStatus = await this.authService.register(createUserDto,);
  //     if (!result.success) {
  //         throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
  //     }
  //     return result;
  // }
  //   }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password changed successfully',
  })
  public async changePassword(
    @Body() changePasswordAccountDto: ChangePasswordAccountDto,
  ): Promise<void> {
    /**
     * Verify that the old password is correct for the specified id
     */
    const checkResult = this.accountService.checkPasswordIsCorrect(
      changePasswordAccountDto.id,
      changePasswordAccountDto.oldPassword,
    );

    if (!checkResult) throw new BadRequestException();

    await this.accountService.updatePassword(
      changePasswordAccountDto.id,
      changePasswordAccountDto.newPassword,
    );
  }
}
