import { IsNotEmpty, IsString } from "class-validator";

export class RefreshToken {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}