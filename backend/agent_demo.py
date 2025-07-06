import asyncio
import websockets
import base64
from cryptography.fernet import Fernet
import json

async def agent(session_id, shared_key_b64):
    uri = "ws://localhost:8000/ws/agent"
    key = base64.urlsafe_b64decode(shared_key_b64)
    fernet = Fernet(base64.urlsafe_b64encode(key[:32]))  # Fernet key must be 32 bytes

    async with websockets.connect(uri) as websocket:
        print("Connected as agent. Type your messages:")
        async def receiver():
            async for message in websocket:
                print("Customer:", fernet.decrypt(message.encode()).decode())
        asyncio.create_task(receiver())
        while True:
            msg = input("> ")
            if msg.strip():
                encrypted = fernet.encrypt(msg.encode()).decode()
                await websocket.send(encrypted)

# Example usage: asyncio.run(agent("sessionid-from-frontend", "sharedkey-from-frontend"))