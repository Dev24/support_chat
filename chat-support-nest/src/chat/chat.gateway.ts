import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
@WebSocketGateway({ cors: '*' })
export class ChatGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) { }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
    });
  }

  @SubscribeMessage('initSession')
  handleInitSession(@ConnectedSocket() client: Socket, @MessageBody() threadInfo: any) {
    //console.log('session info: ', threadInfo, client.id);
    this.handleMessage(client, {
      email: 'Support Personel',
      content:
        `Welcome to support chat ${threadInfo.email}.` +
        `For subject: ${threadInfo.subject}`,
      created: new Date(),
    });
    this.handleMessage(client, {
      email: threadInfo.email,
      content: threadInfo.initMessage,
      created: new Date(),
    });
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    console.log('message body: ', body);
    this.server.emit('message', {
      email: body.email,
      content: body.content,
      created: body.created,
    });
    this.chatRepository.insert({
      session: client.id,
      email: body.email,
      content: body.content,
      created: body.created,
    });
  }



  @SubscribeMessage('endSession')
  handleEndSession(@ConnectedSocket() client: Socket, @MessageBody() threadInfo: any) {
    console.log('session info: ', threadInfo);
    this.handleMessage(client, {
      email: 'Support Personel',
      content:
        'Thank you for `your messages, it has been saved in our system. ' +
        'All staff are busy at the moment. We will get back to you at the earliest convinience.',
      created: new Date(),
    });
  }
}
