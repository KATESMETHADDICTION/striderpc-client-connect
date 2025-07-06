from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base
from datetime import datetime
import asyncio
import base64
from cryptography.fernet import Fernet

DATABASE_URL = "sqlite:///./chat.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    encrypted_message = Column(String)

Base.metadata.create_all(bind=engine)

# Only one active session at a time for demo
class SingleSessionManager:
    def __init__(self):
        self.active_customer: WebSocket | None = None
        self.active_agent: WebSocket | None = None
        self.session_id: str | None = None
        self.shared_key: bytes | None = None

    async def connect_customer(self, websocket: WebSocket, session_id: str, shared_key: str):
        await websocket.accept()
        if self.active_customer is not None:
            await websocket.close(code=4001)
            return False
        self.active_customer = websocket
        self.session_id = session_id
        self.shared_key = base64.urlsafe_b64decode(shared_key)
        return True

    async def connect_agent(self, websocket: WebSocket):
        await websocket.accept()
        if self.active_agent is not None:
            await websocket.close(code=4001)
            return False
        self.active_agent = websocket
        return True

    def disconnect(self, websocket: WebSocket):
        if websocket == self.active_customer:
            self.active_customer = None
            self.session_id = None
            self.shared_key = None
        if websocket == self.active_agent:
            self.active_agent = None

    async def relay(self, sender: WebSocket, message: str):
        receiver = self.active_agent if sender == self.active_customer else self.active_customer
        if receiver is not None:
            await receiver.send_text(message)

manager = SingleSessionManager()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.websocket("/ws/customer/{session_id}/{shared_key}")
async def websocket_customer(websocket: WebSocket, session_id: str, shared_key: str, db=Depends(get_db)):
    if not await manager.connect_customer(websocket, session_id, shared_key):
        return
    try:
        while True:
            encrypted_message = await websocket.receive_text()
            # Store encrypted message
            db.add(ChatMessage(session_id=session_id, encrypted_message=encrypted_message))
            db.commit()
            # Relay to agent
            await manager.relay(websocket, encrypted_message)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.websocket("/ws/agent")
async def websocket_agent(websocket: WebSocket, db=Depends(get_db)):
    if not await manager.connect_agent(websocket):
        return
    try:
        while True:
            encrypted_message = await websocket.receive_text()
            # Store encrypted message (from agent)
            if manager.session_id:
                db.add(ChatMessage(session_id=manager.session_id, encrypted_message=encrypted_message))
                db.commit()
            # Relay to customer
            await manager.relay(websocket, encrypted_message)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@app.get("/chat/{session_id}")
def get_chat_history(session_id: str, db=Depends(get_db)):
    return [
        {
            "timestamp": msg.timestamp.isoformat(),
            "encrypted_message": msg.encrypted_message
        }
        for msg in db.query(ChatMessage).filter_by(session_id=session_id).order_by(ChatMessage.timestamp).all()
    ]