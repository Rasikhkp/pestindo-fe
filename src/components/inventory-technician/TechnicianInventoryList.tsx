@@ .. @@
 import {
   Table,
   TableHeader,
+  Input,
   TableBody,
   TableColumn,
   TableRow,
@@ .. @@
   Selection,
 } from '@nextui-org/react';
-import { Plus, Pencil, Trash } from 'lucide-react';
+import { Plus, Pencil, Trash, Search, Filter } from 'lucide-react';
 import { useInventory } from '../../hooks/useInventory';
-import TechnicianInventoryFilters from './TechnicianInventoryFilters';
 import TechnicianInventoryForm from './TechnicianInventoryForm';
import ExportButtons from '../shared/ExportButtons';
 import { InventoryFilterOptions } from '../../types/inventory';