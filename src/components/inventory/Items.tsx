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
-import InventoryFilters from '../inventory/InventoryFilters';
 import InventoryForm from '../inventory/InventoryForm';
 import ExportButtons from '../customers/ExportButtons';
 import { InventoryFilterOptions, InventoryFormData } from '../../types/inventory';