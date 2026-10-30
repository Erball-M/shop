import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { type ClientGrpc } from "@nestjs/microservices";
import {
  AUTH_SERVICE_NAME,
  type AuthServiceClient,
  type SendOtpRequest,
  type SendOtpResponse,
  type VerifyOtpRequest,
  type VerifyOtpResponse,
} from "@repo/contracts";
import { Observable } from "rxjs";

@Injectable()
export class AuthGrpc implements OnModuleInit {
  private authService!: AuthServiceClient;

  constructor(
    @Inject("AUTH_PACKAGE")
    private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  sendOtp(request: SendOtpRequest): Observable<SendOtpResponse> {
    return this.authService.sendOtp(request);
  }

  verifyOtp(request: VerifyOtpRequest): Observable<VerifyOtpResponse> {
    return this.authService.verifyOtp(request);
  }
}
