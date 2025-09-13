@@ .. @@
 import React from 'react';
 import { motion } from 'framer-motion';
-import { Home, ChartBar, DollarSign, Users } from 'lucide-react';
+import { Home, BarChart, DollarSign, Users } from 'lucide-react';
 import { DashboardSection } from '../FinancialDashboard';
 
 interface DashboardNavProps {
@@ .. @@
   const sections = [
     { id: 'overview', label: 'Overview', icon: Home },
-    { id: 'analytics', label: 'Analytics', icon: ChartBar },
+    { id: 'analytics', label: 'Analytics', icon: BarChart },
     { id: 'payments', label: 'Payments', icon: DollarSign },
     { id: 'team', label: 'Team', icon: Users }
   ];