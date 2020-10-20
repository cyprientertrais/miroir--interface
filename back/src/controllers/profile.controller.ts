import { Controller, Get,Post,Param, Res,Req, Body, BadRequestException, Delete} from '@nestjs/common';
import { Profile } from '../entities/profile.entity';
import { ProfileService } from '../services/profile.service';

@Controller('/profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfiles() {
    return await this.profileService.getAll();
  }
  @Post()
  
  async postProfile(@Body() profile: Profile): Promise<any>{   
    if(!profile){
      throw new BadRequestException("Profile have been wrong disable");
    }
    return await this.profileService.createOne(profile);
  }
  @Get(':name')
  async getProfile(@Param('name') name: string) {
    return await this.profileService.getOne(name)
  }
  @Delete(':name')
  async deleteProfile(@Param('name') name: string,@Res() res) {
    let action= await this.profileService.delete(name);
    return res.status(action.status).json(action);
  }

  
}
