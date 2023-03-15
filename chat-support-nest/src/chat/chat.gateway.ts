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
      console.log(`connected to: ${socket.id}`);
    });
  }

  @SubscribeMessage('initSession')
  handleInitSession(@ConnectedSocket() client: Socket, @MessageBody() threadInfo: any) {
    const roomId: string = client.id;
    console.log(`Joining room ${roomId}.`);
    client.join(threadInfo.email);
    this.handleMessage(client, {
      email: 'Support Personel',
      content:
        `Welcome to support chat ${threadInfo.email}. ` +
        `For subject: ${threadInfo.subject}`,
      created: new Date(),
    });
    this.relayMessage(client.id, roomId, {
      email: threadInfo.email,
      content: threadInfo.initMessage,
      created: new Date(),
    });
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() body: any) {
    const roomId: string = client.id;
    this.relayMessage(client.id, roomId, body);
  }

  relayMessage(socketId: string, roomId: string, message: any) {
    console.log('relaying message. body: ', message);

    // broadcasting this to all rooms to play with, if want single room replace with below line
    //this.server.to(roomId).emit('message', {
    this.server.emit('message', {
      email: message.email,
      content: message.content,
      created: message.created,
    });
    this.chatRepository.insert({
      session: socketId,
      email: message.email,
      content: message.content,
      created: message.created,
    });
  }

  @SubscribeMessage('endSession')
  handleEndSession(@ConnectedSocket() client: Socket, @MessageBody() threadInfo: any) {
    const roomId: string = client.id;
    this.relayMessage(client.id, roomId, {
      email: 'Support Personel',
      content:
        'Thank you for `your messages, it has been saved in our system. ' +
        'We will get back to you at the earliest convinience.',
      created: new Date(),
    });
    console.log(`Leaving room ${roomId}.`);
    client.leave(threadInfo.email);
  }
}
