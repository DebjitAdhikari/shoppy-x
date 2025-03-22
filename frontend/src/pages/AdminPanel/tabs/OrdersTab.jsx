import React from 'react';
import ReactPaginate from 'react-paginate';
import { Eye } from 'lucide-react';

const OrdersTab = () => {
  // Example orders
  const orders = [
    {
      id: 'ORD-123456',
      customer: 'John Doe',
      date: '2024-03-15',
      status: 'Delivered',
      total: 299.97,
      email: 'john@example.com',
    },
    {
      id: 'ORD-123457',
      customer: 'Jane Smith',
      date: '2024-03-14',
      status: 'Processing',
      total: 149.99,
      email: 'jane@example.com',
    },
    {
      id: 'ORD-123458',
      customer: 'Mike Johnson',
      date: '2024-03-13',
      status: 'Shipped',
      total: 499.99,
      email: 'mike@example.com',
    },
    {
      id: 'ORD-123459',
      customer: 'Sarah Williams',
      date: '2024-03-12',
      status: 'Pending',
      total: 199.99,
      email: 'sarah@example.com',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Orders</h1>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={10}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="flex justify-center items-center space-x-2"
          pageClassName="px-3 py-1 rounded hover:bg-gray-100"
          previousClassName="px-3 py-1 rounded hover:bg-gray-100"
          nextClassName="px-3 py-1 rounded hover:bg-gray-100"
          activeClassName="bg-blue-500 text-white"
        />
      </div>
    </div>
  );
};

export default OrdersTab;