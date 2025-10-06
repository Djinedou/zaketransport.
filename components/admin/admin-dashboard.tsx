"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bus,
  LogOut,
  Package,
  AlertTriangle,
  Users,
  Calendar,
  Settings,
  FileText,
  MapPin,
  Activity,
} from "lucide-react"
import { BookingsManagement } from "@/components/admin/bookings-management"
import { PackagesManagement } from "@/components/admin/packages-management"
import { ReportsManagement } from "@/components/admin/reports-management"
import { RoutesManagement } from "@/components/admin/routes-management"
import { StatsOverview } from "@/components/admin/stats-overview"
import { PoliciesManagement } from "@/components/admin/policies-management"
import { SchedulesManagement } from "@/components/admin/schedules-management"
import { StopsManagement } from "@/components/admin/stops-management"
import { ActivityMonitor } from "@/components/admin/activity-monitor"
import { SystemSettings } from "@/components/admin/system-settings"

interface AdminDashboardProps {
  onLogout: () => void
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Bus className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">ZAKE TRANSPORT</span>
                <span className="text-xs text-muted-foreground">Tableau de bord administrateur</span>
              </div>
            </div>

            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 xl:grid-cols-10 h-auto gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Vue d'ensemble</span>
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2 py-3">
              <Bus className="h-4 w-4" />
              <span className="hidden sm:inline">Réservations</span>
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2 py-3">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Colis</span>
            </TabsTrigger>
            <TabsTrigger value="routes" className="flex items-center gap-2 py-3">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Itinéraires</span>
            </TabsTrigger>
            <TabsTrigger value="schedules" className="flex items-center gap-2 py-3">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Horaires</span>
            </TabsTrigger>
            <TabsTrigger value="stops" className="flex items-center gap-2 py-3">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Arrêts</span>
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2 py-3">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Politiques</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2 py-3">
              <AlertTriangle className="h-4 w-4" />
              <span className="hidden sm:inline">Signalements</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2 py-3">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Activité</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2 py-3">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Paramètres</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <StatsOverview />
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            <BookingsManagement />
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <PackagesManagement />
          </TabsContent>

          <TabsContent value="routes" className="space-y-6">
            <RoutesManagement />
          </TabsContent>

          <TabsContent value="schedules" className="space-y-6">
            <SchedulesManagement />
          </TabsContent>

          <TabsContent value="stops" className="space-y-6">
            <StopsManagement />
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            <PoliciesManagement />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsManagement />
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <ActivityMonitor />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
