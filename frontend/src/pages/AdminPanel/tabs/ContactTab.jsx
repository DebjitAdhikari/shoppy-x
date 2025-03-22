import React from 'react';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

const ContactTab = () => {
  // Example contact messages
  const messages = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Product Inquiry',
      message: 'I have a question about your products...',
      date: '2024-03-15',
      status: 'Unread',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Order Status',
      message: 'Could you please check my order status...',
      date: '2024-03-14',
      status: 'Read',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      subject: 'Return Request',
      message: 'I would like to return my recent purchase...',
      date: '2024-03-13',
      status: 'Replied',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Unread':
        return 'bg-red-100 text-red-800';
      case 'Read':
        return 'bg-blue-100 text-blue-800';
      case 'Replied':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Contact Messages</h1>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr key={message.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{message.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{message.email}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{message.subject}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {new Date(message.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <CheckCircle className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <XCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactTab;