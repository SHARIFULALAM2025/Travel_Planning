
import React from 'react';

const DashboardPge = () => {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>

        {/* ড্যাশবোর্ডের কন্টেন্ট এখানে হবে */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-slate-500 text-sm font-medium">Total Trips</h3>
            <p className="text-2xl font-bold text-blue-600">24</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-slate-500 text-sm font-medium">
              Pending Reviews
            </h3>
            <p className="text-2xl font-bold text-orange-500">12</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-slate-500 text-sm font-medium">Total Spend</h3>
            <p className="text-2xl font-bold text-green-600">$1,250</p>
          </div>
        </div>
      </div>
    )
};

export default DashboardPge;