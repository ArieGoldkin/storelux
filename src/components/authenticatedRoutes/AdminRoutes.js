import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import AddCategory from "../adminComponents/addCategory/AddCategory";
import ShowAllProductsList from "../adminComponents/showAllProductsList/ShowAllProductsList";
import AdminRateChange from "../adminComponents/adminRateChange/AdminRateChange";
import OrderManage from "../adminComponents/orderManage/OrderManage";
import TrafficChartsList from "../adminComponents/adminTrafficCharts/TrafficChartsList";

const AdminRoutes = () => {
  return (
    <Switch>
      <Route path="/admin/addcategory" component={AddCategory} />
      <Route path="/admin/showallProducts" component={ShowAllProductsList} />
      <Route path="/admin/ratechanges" component={AdminRateChange} />
      <Route path="/admin/allorders" component={OrderManage} />
      <Route path="/admin/trafficChart" component={TrafficChartsList} />
      <Redirect to="/products" />
    </Switch>
  );
};

export default AdminRoutes;
