import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Bookings from "src/modules/booking/booking.entity";
import { CronJobService } from "./schedule.service";
import { BookingService } from "src/modules/booking/booking.service";
import Kuotas from "../modules/kuota/kuota.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Bookings, Kuotas])],
  providers: [CronJobService, BookingService],
})
export class CronJobModule { }