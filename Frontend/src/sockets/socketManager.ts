import { io, Socket } from "socket.io-client";

export class SocketManager {
  private socket: Socket | null = null;
  private readonly namespace: string;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  connect(): void {
    if (!this.socket) {
      this.socket = io(`${import.meta.env.VITE_BACKEND_URL}/${this.namespace}`, {
        autoConnect: false,
        transports: ["websocket"],
      });
      this.socket.connect();
      console.log(`✅ Connected to ${this.namespace}`);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log(`❌ Disconnected from ${this.namespace}`);
      this.socket = null;
    }
  }

  on(event: string, callback: (...args: any[]) => void): void {
    this.socket?.on(event, callback);
  }

  emit(event: string, payload?: any): void {
    this.socket?.emit(event, payload);
  }

  off(event: string): void {
    this.socket?.off(event);
  }

  get instance(): Socket | null {
    return this.socket;
  }
}
