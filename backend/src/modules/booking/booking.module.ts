import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import Kuotas from "../kuota/kuota.entity";
import Bookings from "./booking.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookings, Kuotas]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule { }