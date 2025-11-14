import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from './entities/links.entity';
import { LinksCreateController } from './controllers/create/links.create.controller';
import { LinksGetController } from './controllers/get/links.get.controller';
import { LinksUpdateController } from './controllers/update/links.update.controller';
import { LinksDeleteController } from './controllers/delete/links.delete.controller';
import { LinksRedirectController } from './controllers/redirect/links.redirect.controller';
import { LinksCreateService } from './services/create/links.create.service';
import { LinksGetService } from './services/get/links.get.service';
import { LinksUpdateService } from './services/update/links.update.service';
import { LinksDeleteService } from './services/delete/links.delete.service';

@Module({
  imports: [TypeOrmModule.forFeature([Links])],
  controllers: [LinksCreateController, LinksGetController, LinksUpdateController, LinksDeleteController, LinksRedirectController],
  providers: [LinksCreateService, LinksGetService, LinksUpdateService, LinksDeleteService],
  exports: [LinksCreateService, LinksGetService, LinksUpdateService, LinksDeleteService],
})

export class LinksModule {}