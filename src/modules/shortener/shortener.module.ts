import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from './entities/links.entity';
import { LinksCreateController } from './controllers/links.create.controller';
import { LinksRedirectController } from './controllers/links.redirect.controller';
import { LinksCreateService } from './services/links.create.service';
import { LinksGetService } from './services/links.get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Links])],
  controllers: [LinksCreateController, LinksRedirectController],
  providers: [LinksCreateService, LinksGetService],
  exports: [LinksCreateService, LinksGetService],
})

export class LinksModule {}