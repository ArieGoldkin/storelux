import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NewCategory from "../../containers/Admin/NewCategory/NewCategory";
import ProductsList from "../../containers/Admin/ProductsList/ProductsList";
import VatRateChange from "../../containers/Admin/VatRateChange/VatRateChange";
import OrderManage from "../../containers/Admin/OrdersManage/OrderManage";
import TrafficChartsList from "../../containers/Admin/Charts/TrafficChartsList";

const Admin = () => {
  return (
    <Switch>
      <Route path="/admin/addcategory" component={NewCategory} />
      <Route path="/admin/showallProducts" component={ProductsList} />
      <Route path="/admin/ratechanges" component={VatRateChange} />
      <Route path="/admin/allorders" component={OrderManage} />
      <Route path="/admin/trafficChart" component={TrafficChartsList} />
      <Redirect to="/products" />
    </Switch>
  );
};

export default Admin;
