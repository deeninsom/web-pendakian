import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BlacklistController } from "./blacklist.controller";
import { BlacklistService } from "./blacklist.service";
import Blacklists from "./blacklist.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Blacklists]),
  ],
  controllers: [BlacklistController],
  providers: [BlacklistService],
})
export class BlacklistModule { }