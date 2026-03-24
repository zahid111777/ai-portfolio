import React, { useState, useEffect } from 'react';
import { contactService } from '../services';
import { ContactMessage } from '../types';

const MessageManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showUnreadOnly]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await contactService.getMessages(showUnreadOnly);
      setMessages(data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await contactService.markMessageAsRead(id);
      setMessage({ type: 'success', text: 'Message marked as read!' });
      await loadMessages();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: true });
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Failed to mark message as read' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await contactService.deleteMessage(id);
      setMessage({ type: 'success', text: 'Message deleted successfully!' });
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      await loadMessages();
    } catch (error: any) {
      setMessage({ type: 'error', text: 'Failed to delete message' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Message Manager</h2>
          {unreadCount > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          className={`px-4 py-2 rounded-md text-sm ${
            showUnreadOnly
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {showUnreadOnly ? 'Show All' : 'Unread Only'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {messages.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <p className="text-gray-500">
            {showUnreadOnly ? 'No unread messages' : 'No messages yet'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.is_read) {
                    handleMarkAsRead(msg.id);
                  }
                }}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  selectedMessage?.id === msg.id
                    ? 'bg-indigo-50 border-2 border-indigo-500'
                    : msg.is_read
                    ? 'bg-white border border-gray-200 hover:bg-gray-50'
                    : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{msg.name}</h3>
                  {!msg.is_read && (
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-1">{msg.email}</p>
                {msg.subject && (
                  <p className="text-sm text-gray-700 font-medium mb-1 line-clamp-1">{msg.subject}</p>
                )}
                <p className="text-xs text-gray-500 line-clamp-2">{msg.message}</p>
                <p className="text-xs text-gray-400 mt-2">{formatDate(msg.created_at)}</p>
              </div>
            ))}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedMessage.name}</h3>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📧 {selectedMessage.email}</p>
                      <p>🕐 {formatDate(selectedMessage.created_at)}</p>
                      {selectedMessage.subject && (
                        <p className="font-medium text-gray-900 mt-2">Subject: {selectedMessage.subject}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!selectedMessage.is_read && (
                      <button
                        onClick={() => handleMarkAsRead(selectedMessage.id)}
                        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Message:</h4>
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>

                <div className="mt-6 pt-4 border-t">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Your message'}`}
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-12 text-center">
                <p className="text-gray-500">Select a message to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageManager;
