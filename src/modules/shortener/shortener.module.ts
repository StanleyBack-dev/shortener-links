import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from './entities/links.entity';
import { LinksCreateController } from './controllers/create/links.create.controller';
import { LinksGetController } from './controllers/get/links.get.controller';
import { LinksUpdateController } from './controllers/update/links.update.controller';
import { LinksDeleteController } from './controllers/delete/links.delete.controller';
import { LinksRedirectController } from './controllers/redirect/links.redirect.controller';
import { LinksCreateService } from './services/links.create.service';
import { LinksGetService } from './services/links.get.service';
import { LinksUpdateService } from './services/links.update.service';
import { LinksDeleteService } from './services/links.delete.service';

@Module({
  imports: [TypeOrmModule.forFeature([Links])],
  controllers: [LinksCreateController, LinksGetController, LinksUpdateController, LinksDeleteController, LinksRedirectController],
  providers: [LinksCreateService, LinksGetService, LinksUpdateService, LinksDeleteService],
  exports: [LinksCreateService, LinksGetService, LinksUpdateService, LinksDeleteService],
})

export class LinksModule {}