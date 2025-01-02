import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import AuthGuard from '../components/AuthGuard';
import Login from '../pages/auth/Login';
import EditProfile from '../pages/profile/Edit';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import CreateCustomer from '../pages/customers/Create';
import EditCustomer from '../pages/customers/Edit';
import CustomerDetail from '../pages/customers/Detail';
import Suppliers from '../pages/Suppliers';
import CreateSupplier from '../pages/suppliers/Create';
import EditSupplier from '../pages/suppliers/Edit';
import SupplierDetail from '../pages/suppliers/Detail';
import Jobs from '../pages/Jobs';
import CreateJob from '../pages/jobs/Create';
import EditJob from '../pages/jobs/Edit';
import JobDetail from '../pages/jobs/Detail';
import Staff from '../pages/Staff';
import CreateEmployee from '../pages/employees/Create';
import EditEmployee from '../pages/employees/Edit';
import EmployeeDetail from '../pages/employees/Detail';
import Schedule from '../pages/Schedule';
import Inventory from '../pages/Inventory';
import InventoryItems from '../pages/inventory/Items';
import InventoryLogs from '../pages/inventory/Logs';
import InventoryRequests from '../pages/inventory/Requests';
import InventoryOrders from '../pages/inventory/Orders';
import Activities from '../pages/Activities';
import TechnicianInventoryList from '../pages/inventory-technician/TechnicianInventoryList';
import TechnicianApprovalRequest from '../pages/inventory-technician/TechnicianApprovalRequest';
import TechnicianJobs from '../pages/technician/TechnicianJobs';
import TechnicianJobDetail from '../pages/technician/TechnicianJobDetail';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/customers', element: <Customers /> },
      { path: '/customers/create', element: <CreateCustomer /> },
      { path: '/customers/edit/:id', element: <EditCustomer /> },
      { path: '/customers/:id', element: <CustomerDetail /> },
      { path: '/suppliers', element: <Suppliers /> },
      { path: '/suppliers/create', element: <CreateSupplier /> },
      { path: '/suppliers/edit/:id', element: <EditSupplier /> },
      { path: '/suppliers/:id', element: <SupplierDetail /> },
      { path: '/jobs', element: <Jobs /> },
      { path: '/jobs/create', element: <CreateJob /> },
      { path: '/jobs/edit/:id', element: <EditJob /> },
      { path: '/jobs/:id', element: <JobDetail /> },
      { path: '/staff', element: <Staff /> },
      { path: '/staff/create', element: <CreateEmployee /> },
      { path: '/staff/edit/:id', element: <EditEmployee /> },
      { path: '/staff/:id', element: <EmployeeDetail /> },
      { path: '/schedule', element: <Schedule /> },
      { path: '/inventory', element: <Inventory /> },
      { path: '/inventory/items', element: <InventoryItems /> },
      { path: '/inventory/logs', element: <InventoryLogs /> },
      { path: '/inventory/requests', element: <InventoryRequests /> },
      { path: '/inventory/orders', element: <InventoryOrders /> },
      { path: '/activities', element: <Activities /> },
      { path: '/profile/edit', element: <EditProfile /> },
      { path: '/inventory-technician/list', element: <TechnicianInventoryList /> },
      { path: '/inventory-technician/approval_request', element: <TechnicianApprovalRequest /> },
      { path: '/technician-jobs', element: <TechnicianJobs /> },
      { path: '/technician-jobs/:id', element: <TechnicianJobDetail /> },
    ],
  },
]);