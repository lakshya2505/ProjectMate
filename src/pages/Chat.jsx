import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, auth } from '../services/firebase';
import { 
  collection, addDoc, query, orderBy, onSnapshot, 
  serverTimestamp, doc, setDoc // Added doc and setDoc
} from 'firebase/firestore';
import { Send, ArrowLeft, User } from 'lucide-react';

export default function Chat() {
  const { chatId, receiverName } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    if (!chatId) return;

    // Listen to messages in the specific chat room
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [chatId]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const chatRef = doc(db, "chats", chatId); // Reference to the parent room

    try {
      // 1. Update/Create the parent document first so it appears in the Inbox
      // This allows the receiver to see the last message and your name
      await setDoc(chatRef, {
        participants: chatId.split('_'), // [uid1, uid2]
        lastMessage: newMessage,
        lastUpdated: serverTimestamp(),
        // Store your name so the other person knows who sent it in their list
        [`name_${auth.currentUser.uid}`]: auth.currentUser.displayName || "Nirma Student",
      }, { merge: true });

      // 2. Add the actual message to the sub-collection
      const messageData = {
        text: newMessage,
        senderId: auth.currentUser.uid,
        senderName: auth.currentUser.displayName || "Nirma Student",
        createdAt: serverTimestamp(),
      };

      setNewMessage(""); // Clear input immediately for better UX
      await addDoc(collection(db, "chats", chatId, "messages"), messageData);
      
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Chat Header */}
      <div className="bg-white border-b p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-500">
            <ArrowLeft size={20} />
          </button>
          <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center">
            <User className="text-orange-500" size={20} />
          </div>
          <div>
            <h2 className="font-black text-slate-800 tracking-tight text-lg leading-none">{receiverName}</h2>
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Active Now</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.senderId === auth.currentUser.uid;
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 px-6 rounded-[2rem] font-medium shadow-sm text-sm ${
                isMe 
                  ? 'bg-orange-500 text-white rounded-tr-none shadow-orange-200' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
              }`}>
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={sendMessage} className="p-6 bg-white border-t flex gap-4">
        <input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Message your next teammate..."
          className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-500 outline-none font-bold text-slate-700 placeholder:text-slate-300"
        />
        <button type="submit" className="bg-orange-500 text-white p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-500/20">
          <Send size={24} />
        </button>
      </form>
    </div>
  );
}