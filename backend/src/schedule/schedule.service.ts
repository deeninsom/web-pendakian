import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule'; // Perhatikan perubahan ini
import { BookingService } from 'src/modules/booking/booking.service';

@Injectable()
export class CronJobService {
  constructor(private readonly bookingService: BookingService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2PM, { 
    name: 'deleteBookings', 
  })
  async handleCron() {
    try {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      console.log("Hapus data sebelum:", oneDayAgo);

      await this.bookingService.deleteBookingsCreatedBefore(oneDayAgo);
      console.log("Data telah dihapus");
    } catch (error) {
      console.error('Cron Job Error:', error);
    }
  }
}
