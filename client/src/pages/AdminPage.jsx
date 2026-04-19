import React from 'react';

const AdminPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Total Sites</h3>
          <p className="text-3xl font-bold text-amber-700">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Pending</h3>
          <p className="text-3xl font-bold text-amber-700">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Users</h3>
          <p className="text-3xl font-bold text-amber-700">0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
