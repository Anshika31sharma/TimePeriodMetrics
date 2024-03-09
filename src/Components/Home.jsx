import React, { useState, useEffect } from "react";
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";

function Home() {
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [weeklyOrders, setWeeklyOrders] = useState(0);
  const [newCustomers, setNewCustomers] = useState(0);

  useEffect(() => {
    fetch("https://apigenerator.dronahq.com/api/l_WmAR8I/data")
      .then((response) => response.json())
      .then((data) => {
        setWeeklyRevenue(data?.weeklyRevenue || 0);
        setWeeklyOrders(data?.weeklyOrders || 0);
        setNewCustomers(data?.newCustomers || 0);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center">
      <div className=" md:w-1/3 h-40  bg-gray-50 m-5  shadow-lg rounded-md relative">
        <span className="absolute right-0 top-0 mt-2 md:mt-4 lg:mt-6 mr-2 md:mr-4 lg:mr-6">
          <CurrencyDollarIcon className="h-16 md:h-20 lg:h-32 w-16 md:w-20 lg:w-32 text-blue-100" />
        </span>
        <div className="ml-5">
          <h1 className="text-gray-400 mt-2 text-xl">Weekly Revenue</h1>
          <h2 className="mt-2 text-blue-400 font-bold text-4xl">
            $ {weeklyRevenue}
          </h2>
          <h3 className="mt-2 md:mt-4 lg:mt-6 text-green-600">
            +5% since last week
          </h3>
        </div>
      </div>

      <div className=" md:w-1/3 h-40 bg-gray-50 m-5  shadow-lg rounded-md relative">
        <span className="absolute right-0 top-0 mt-2 md:mt-4 lg:mt-6 mr-2 md:mr-4 lg:mr-6">
          <ShoppingCartIcon className="h-16 md:h-20 lg:h-32 w-16 md:w-20 lg:w-32 text-red-100" />
        </span>
        <div className="ml-5">
          <h1 className="text-gray-400 mt-2 text-xl">Weekly Orders</h1>
          <h2 className="mt-2 text-orange-400 font-bold text-4xl">
            {weeklyOrders}
          </h2>
          <h3 className="mt-2 md:mt-4 lg:mt-6 text-red-500">
            -254% since last week
          </h3>
        </div>
      </div>

      <div className=" md:w-1/3  h-40 bg-gray-50 m-5  shadow-lg rounded-md relative">
        <span className="absolute right-0 top-0 mt-2 md:mt-4 lg:mt-6 mr-2 md:mr-4 lg:mr-6">
          <UserGroupIcon className="h-16 md:h-20 lg:h-32 w-16 md:w-20 lg:w-32 text-green-100" />
        </span>
        <div className="ml-5">
          <h1 className="text-gray-400 mt-2 text-xl">New Customers</h1>
          <h2 className="mt-2 text-green-600 font-bold text-4xl">
            {newCustomers}
          </h2>
          <h3 className="mt-2 md:mt-4 lg:mt-6 text-green-600">
            +93% since last week
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Home;
