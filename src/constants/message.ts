export enum MessageType {
  Message = 'message',
}

export enum MessageSubtype {
  None = '',
  MessageChanged = 'message_changed',
  MessageDeleted = 'message_deleted',
  MessageReplied = 'message_replied',
  ChannelJoined = 'channel_joined',

  BotMessage = 'bot_message',
}
