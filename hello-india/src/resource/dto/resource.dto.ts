import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class AddResourceDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  resourceLink: string;
}

export class ResourceUpdateDto {
  @IsBoolean()
  status: boolean;
}
