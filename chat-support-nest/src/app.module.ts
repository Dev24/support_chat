import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat/chat.entity';

@Module({
  imports: [
    ChatModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/chat.sqlite3',
      entities: [Chat],
      //autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
