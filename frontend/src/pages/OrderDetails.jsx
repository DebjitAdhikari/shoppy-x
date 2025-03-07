import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, ArrowLeft, MapPin, Clock, TicketCheck } from 'lucide-react';

const OrderDetails = () => {
  const { orderId } = useParams();

  // Mock order data
  const order = {
    id: orderId,
    date: '2024-03-15',
    status: 'Delivered',
    total: 299.97,
    shipping: 9.99,
    tax: 24.99,
    address: {
      name: 'Debjit Adhikari',
      street: 'Park Street, 32',
      city: 'Kolkata',
      state: 'West Bengal',
      zip: '70001',
      country: 'India'
    },
    items: [
      {
        id: 1,
        name: 'Wireless Headphones',
        price: 129.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      },
      {
        id: 2,
        name: 'Smart Watch',
        price: 169.98,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
      }
    ],
    timeline: [
        {
            title: 'Order Placed',
            status:"done",
            date: '2024-03-12 15:20',
            description: 'Order confirmed and payment received'
          },
          {
            title: 'Shipped',
            status:"done",
            date: '2024-03-13 10:30',
            description: 'Package has been shipped'
          },
          {
            title: 'In Transit',
            status:"done",
            date: '2024-03-14 18:45',
            description: 'Package arrived at local facility'
          },
          {
            title: 'Out for Delivery',
            status:"progress",
            date: '2024-03-15 09:15',
            description: 'Package is out for delivery'
          },  
      {
        title: 'Delivered',
        status:"progress",
        date: '2024-03-15 14:30',
        description: 'Package delivered to recipient'
      },
      
      
      
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/profile"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Orders
          </Link>
          <div className="mt-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Order: {order.id}
            </h1>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                order.status === 'Delivered'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Items */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                <div className="divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <div key={item.id} className="py-6 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                      <div className="ml-6 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                        <p className="mt-1 text-lg font-medium text-gray-900">
                        ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{order.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">₹{order.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">₹{order.tax.toFixed(2)}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-medium">
                      <span>Total</span>
                      <span>₹{(order.total + order.shipping + order.tax).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Order Timeline</h2>
              <div className="space-y-8">
                {order.timeline.map((event, index) => (
                  <div key={index} className="relative">
                    {index !== order.timeline.length - 1 && (
                      <div className="absolute top-6 left-4 -bottom-10 w-0.5 bg-gray-200" />
                    )}
                    <div className="relative flex items-start">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full 
                    ${event.status==="progress"?"bg-blue-100 text-blue-600":"bg-green-100 text-green-600"} `}>
                        {event.status === "progress" ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          <TicketCheck className="h-4  w-4" />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          {event.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {event.description}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(event.date).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    Delivery Address
                  </div>
                  <div className="text-gray-900">
                    <p className="font-medium">{order.address.name}</p>
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state} {order.address.zip}
                    </p>
                    <p>{order.address.country}</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Truck className="h-5 w-5 mr-2" />
                    Shipping Method
                  </div>
                  <p className="text-gray-900">Standard Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;