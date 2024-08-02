type SocketMapping = Record<string, string>

export class SocketManager {
  private userSocketMap: SocketMapping = {}

  public addUser (userId: string, socketId: string): void {
    this.userSocketMap[userId] = socketId
    console.log('userSocketMap: ', this.userSocketMap)
  }

  public removeUser (userId: string): void {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.userSocketMap[userId]
  }

  public getOnlineUsers (): string[] {
    return Object.keys(this.userSocketMap)
  }

  public getOnlineUser (receiverId: any): string {
    return this.userSocketMap[receiverId]
  }
}
