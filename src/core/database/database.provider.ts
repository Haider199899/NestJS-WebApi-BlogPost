/* eslint-disable prettier/prettier */
import { Sequelize } from 'sequelize-typescript';
import { Post } from 'src/modules/posts/posts.entity';
import { User } from 'src/modules/users/users.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseCon} from '../database/databaseConfig';

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
           config = databaseCon.development;
           break;
        case TEST:
           config =databaseCon.test;
           break;
        case PRODUCTION:
           config = databaseCon.production;
           break;
        default:
           config = databaseCon.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User,Post]);
        await sequelize.sync();
        return sequelize;
    },
}];