import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from './entities/links.entity';
import { LinksCreateController } from './controllers/create/links.create.controller';
import { LinksGetController } from './controllers/get/links.get.controller';
import { LinksRedirectController } from './controllers/redirect/links.redirect.controller';
import { LinksCreateService } from './services/links.create.service';
import { LinksGetService } from './services/links.get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Links])],
  controllers: [LinksCreateController, LinksGetController, LinksRedirectController],
  providers: [LinksCreateService, LinksGetService],
  exports: [LinksCreateService, LinksGetService],
})

export class LinksModule {}