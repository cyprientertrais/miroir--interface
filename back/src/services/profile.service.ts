import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entities/profile.entity';
import { MongoRepository } from 'typeorm';
import { Widget } from 'src/entities/widget.entity';
import { Dashboard } from 'src/entities/dashboard.entity';

@Injectable()
export class ProfileService {
  constructor(
  @InjectRepository(Profile) 
  private readonly profileRepository: MongoRepository<Profile>)
  {}

  async getAll() {
    let e = await this.profileRepository.find();
    return e;
  }

  async getOne(name: string) : Promise<Profile> {
     let e = await this.profileRepository.findOne({pseudo:name});
     if(e==null){
       throw new NotFoundException();
     }
    return e;
  }
  
  async createOne(profile : Profile){
    return this.profileRepository.save(new Profile(profile)).catch(err=>{
      throw new BadRequestException(err);
    });
  }

  async getAllDashboardsFromProfileService(name : string){
    let e = await this.getOne(name)
    return e.dashboards
  }

  async createDashboardFromProfileService(newDashboard : Dashboard,name :string){

    let profile = await this.getOne(name)
    const dashboardAlreadyExists = this.doesDashboardNameAlreadyExists(profile.dashboards, newDashboard.name)
    if(dashboardAlreadyExists == true){
    }else{
      let dash = new Dashboard()
      dash.name = newDashboard.name
      profile.dashboards.push(newDashboard)
      this.profileRepository.save(profile)
    }
    };
  

 doesDashboardNameAlreadyExists(dashboards : Dashboard[], newDashboardName : string) : boolean{
  let alreadyExists : boolean;
  dashboards.forEach(element => {
    if(newDashboardName === element.name){
      alreadyExists = true;
    }
  });
  if(alreadyExists == true){
    return true;
  }else{
    return false;
  }
}

/*async addWidgetToDashboard(name : string, dashboard : Dashboard, newWidgetName : Widget){
  let alreadyExists : boolean;
  let profile : Promise<Profile>
  
}*/

}