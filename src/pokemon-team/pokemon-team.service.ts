import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PokemonTeamService {

  dabatabase: any[] = [];

  constructor() {
  }

  getTeam(): any {
    return this.dabatabase;
  }

  addMember(req: any): any {
    this.dabatabase.push({
      _id: uuidv4(),
      ...req
    });
    return {
      success: true
    }
  }

  updateMember(req: any): any {
    const pokemon = this.dabatabase.find(p => p._id === req._id);
    pokemon.nickname = req.nickname;
    return {
      success: true
    }
  }

  deleteMember(_id: number): any {
    this.dabatabase = this.dabatabase.filter(m => m._id != _id);

    return {
      success: true
    }
  }
}