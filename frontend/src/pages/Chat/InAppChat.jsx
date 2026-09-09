import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import chatService from '../../services/chatService';

const InAppChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputContent, setInputContent] = useState('');
  const [receiverId] = useState(user?.role === 'WORKER' ? 3 : 1); // Chat between Worker (1) and Employer (3)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, [user]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const senderId = user?.id || 1;
      const data = await chatService.getConversation(senderId, receiverId);
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    try {
      const senderId = user?.id || 1;
      const newMsg = await chatService.sendMessage(senderId, {
        receiverId,
        bookingId: 1,
        content: inputContent
      });
      setMessages([...messages, newMsg]);
      setInputContent('');
    } catch (err) {
      alert('Failed to send message');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-[600px]">
          
          {/* Chat Top Bar */}
          <div className="p-4 bg-[#0f172a] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={user?.role === 'WORKER' ? "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80" : "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80"}
                alt="Chat User"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#f97316]"
              />
              <div>
                <h3 className="font-bold text-base font-display">
                  {user?.role === 'WORKER' ? 'Anil Sharma (Employer)' : 'Suresh Patil (Master Carpenter)'}
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  Online & Available
                </span>
              </div>
            </div>

            <a
              href="tel:9876543210"
              className="p-2.5 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full flex items-center justify-center transition-colors"
              title="Call Direct"
            >
              <span className="material-symbols-outlined text-xl">call</span>
            </a>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
            {loading ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-3xl text-[#f97316] animate-spin">progress_activity</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">
                No messages yet. Send a message to start conversation!
              </div>
            ) : (
              messages.map((m) => {
                const isMe = m.sender?.id === (user?.id || 1);
                return (
                  <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs sm:max-w-md p-4 rounded-2xl text-sm ${
                      isMe ? 'bg-[#f97316] text-white rounded-br-none shadow' : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none shadow-sm'
                    }`}>
                      <p className="leading-relaxed">{m.content}</p>
                      <span className={`text-[10px] block mt-1 ${isMe ? 'text-white/80 text-right' : 'text-slate-400'}`}>
                        {m.sentAt ? new Date(m.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              placeholder="Type message in Hindi or English (e.g., Kal 9 baje site par aana)..."
              className="flex-1 px-4 py-3 border border-slate-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#f97316]"
            />
            <button
              type="submit"
              className="p-3 bg-[#f97316] hover:bg-[#ea580c] text-white rounded-full flex items-center justify-center transition-colors shadow"
            >
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InAppChat;
