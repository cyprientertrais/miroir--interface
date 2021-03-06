import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AdminService } from './admin.service';
import SSH2Promise = require('ssh2-promise');
import { ApiTags } from '@nestjs/swagger';

const sshconfig2 = {
  host: '10.3.141.1',
  username: 'ssh_miroir',
  password: 'ssh_miroir',
};

@ApiTags('admin')
@Controller('admin')
// TODO REFACT ADMIN / WIDGETS / WIFI
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/wifiscan')
  async getProfiles() {
    // TODO METTRE DANS LE SERVICE
    const ssh = new SSH2Promise([sshconfig2]);
    const data = await ssh.exec('parse.sh');
    const tab = data.split('\n');
    const res = { wifi: [] };
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].length !== 0) {
        res.wifi.push(tab[i]);
      }
    }
    return res;
  }

  @Post('/checkAdminPassword')
  async checkAdminPassword(@Body() body, @Res() res) {
    const isValid = await this.adminService.checkAdminPassword(body);

    if (!isValid) {
      return res.sendStatus(403);
    }
    return res.sendStatus(200);
  }

  @Get('/orientation')
  async getOrientation() {
    return this.adminService.getOrientation();
  }

  @Get('/location')
  async getLocation() {
    return this.adminService.getLocation();
  }

  @Post('/location')
  async postLocation(@Body() body) {
    return this.adminService.postLocation(body);
  }

  @Get('/flowRadio')
  async getFlowRadio() {
    return this.adminService.getFlowRadio()
  }

  @Get('/widgets')
  async getWidgets() {
    return this.adminService.getAvailableWidgets()
  }

  @Post('/sendWifi')
  async getSendWifi(@Body() body, @Res() response) {
    const ssh = new SSH2Promise([sshconfig2]);
    // A quoi ça sert ??
    // TODO METTRE DANS LE SERVICE

    await ssh.exec(
      ' echo -e network={ ssid=\\"' +
        body.ssid +
        '\\" psk=\\"' +
        body.password +
        '\\"} >> /etc/wpa_supplicant/wpa_supplicant.conf ',
    );
    /** PBM : ET SI CA MARCHE PAS 200 QUAND MEME ?**/
    return response.json(200);
  }
}
