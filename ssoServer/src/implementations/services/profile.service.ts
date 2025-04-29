import { inject, injectable } from 'inversify';

import DAL_TYPES from '../../interfaces/dals/dals.types';
import { IProfileDal } from '../../interfaces/dals/profile.dal';
import { IProfileService } from '../../interfaces/services/profile.service';
import { ITokenService } from '../../interfaces/services/token.service';
import { ProfileModel } from '../../models/profile.model';
import SERVICE_TYPEs from '../../interfaces/services/services.types';
import { TOKEN_TYPE } from '../../models/token-info.model';

@injectable()
export class ProfileService implements IProfileService {
    constructor(@inject(DAL_TYPES.ProfileDal) private readonly profileDal: IProfileDal,
    @inject(SERVICE_TYPEs.TokenService) private readonly tokenService: ITokenService) {}

    findAll(): Promise<ProfileModel[]> {
        return this.profileDal.findAll();
    }

    findById(id: string): Promise<ProfileModel>{
        return  this.profileDal.findById(id);
    }

    create(item: Partial<ProfileModel>): Promise<ProfileModel> {
        return this.profileDal.create(item);
    }

    async login(login: string, password: string): Promise<string> {
        const profiles: ProfileModel[] = await this.profileDal.findAll();

        const foundProfile: ProfileModel | undefined = profiles.find((profile: ProfileModel) => profile.login === login);
        if (!foundProfile) {
            throw new Error('Login not found');
        }

        console.log('Mot de passe reçu du frontend :', password);
        console.log('Mot de passe stocké :', foundProfile.password);
        console.log('Égalité stricte ? ', foundProfile.password === password);

        if (foundProfile.password !== password) {
            throw new Error('Bad password');
        }

        return this.tokenService.generateToken({id: foundProfile.id, type: TOKEN_TYPE.CLASSIC}, '15m');
    }
}
