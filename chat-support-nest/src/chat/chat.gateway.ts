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
    const roomId: string = this.getRoomId(client);
    console.log(`Joining room ${roomId}.`);

    client.join(roomId);
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
    const roomId: string = this.getRoomId(client);
    this.relayMessage(client.id, roomId, body);
  }

  @SubscribeMessage('endSession')
  handleEndSession(@ConnectedSocket() client: Socket, @MessageBody() threadInfo: any) {
    const roomId: string = this.getRoomId(client);
    this.relayMessage(client.id, roomId, {
      email: 'Support Personel',
      content:
        `Thank you ${client.handshake.auth.email ?? ''}. ` +
        'We will get back to you at the earliest convinience. Chat closing in 5 seconds.',
      created: new Date(),
    });
    console.log(`Leaving room ${roomId}.`);
    client.leave(threadInfo.email);
    client.disconnect();
  }

  getRoomId(socket: Socket): string {
    return socket.handshake.auth.email ?? socket.id;
  }

  relayMessage(socketId: string, roomId: string, message: any) {
    console.log('relaying message. body: ', message);

    // to broadcasting this to all rooms replace with below line
    //this.server.emit('message', {
    this.server.to(roomId).emit('message', {
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

}
