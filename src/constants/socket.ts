export enum SocketType {
  Hello = 'hello',
  Ping = 'ping',
  Pong = 'pong',
  Message = 'message',
  UserTyping = 'user_typing',
  PresenceSub = 'presence_sub',
  PresenceChanged = 'presence_changed',
  UserProfileChanged = 'user_profile_changed',
  ChannelMemberJoined = 'channel_member_joined',
}

export enum SocketSubtype {
  MessageReplied = 'message_replied',
  MessageChanged = 'message_changed',
  MessageDeleted = 'message_deleted',
  ChannelJoin = 'channel_join',
}
