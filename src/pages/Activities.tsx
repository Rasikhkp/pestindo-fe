import { useState } from 'react';
import { 
  Button, 
  Input, 
  Card, 
  CardBody, 
  Image, 
  Popover,
  PopoverTrigger,
  PopoverContent,
 } from '@nextui-org/react';
import { 
  Plus, 
  Circle, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Camera, 
  MessageCircle,
  Search,
  Filter,
 } from 'lucide-react';
import { useActivities } from '../hooks/useActivities';
import ActivityForm from '../components/activities/ActivityForm';
import { ActivityFilterOptions } from '../types/activity';
import { motion } from 'framer-motion';

export default function Activities() {
  const { activities, getFilteredActivities } = useActivities();
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState<ActivityFilterOptions>({});

  const filteredActivities = getFilteredActivities(filters);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (description: string) => {
    if (description.toLowerCase().includes('survey')) return MapPin;
    if (description.toLowerCase().includes('maintenance')) return CheckCircle2;
    if (description.toLowerCase().includes('foto') || description.toLowerCase().includes('gambar')) return Camera;
    return MessageCircle;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by description..."
          startContent={<Search className="w-4 h-4 text-default-400" />}
          value={filters.search || ''}
          onClear={() => setFilters({ ...filters, search: '' })}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <div className="flex gap-3">
          <Popover placement="bottom">
            <PopoverTrigger>
              <Button 
                variant="flat" 
                startContent={<Filter className="w-4 h-4" />}
              >
                Tanggal
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex gap-4">
                <Input
                  type="date"
                  label="Dari Tanggal"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
                <Input
                  type="date"
                  label="Sampai Tanggal"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </div>
            </PopoverContent>
          </Popover>
          <Button
            color="primary"
            onPress={() => setShowForm(true)}
            startContent={<Plus className="w-4 h-4" />}
          >
            Tambah Aktivitas
          </Button>
        </div>
      </div>

      <div className="relative pl-8 space-y-8">
        {/* Vertical Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-primary/20" />

        {filteredActivities.map((activity, index) => {
          const ActivityIcon = getActivityIcon(activity.description);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Date Header */}
              {(index === 0 || formatDate(activity.createdAt) !== formatDate(filteredActivities[index - 1].createdAt)) && (
                <div className="mb-4 flex items-center gap-2 -ml-8">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">{formatDate(activity.createdAt)}</h3>
                </div>
              )}

              {/* Activity Card */}
              <div className="relative">
                {/* Timeline Dot with Icon */}
                <div className="absolute -left-10 mt-1.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ActivityIcon className="w-4 h-4 text-primary" />
                  </div>
                </div>

                <Card className="ml-2 hover:shadow-lg transition-shadow duration-200">
                  <CardBody className="space-y-4">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="font-medium">{formatTime(activity.createdAt)}</span>
                      </p>
                    </div>

                    <p className="text-base">{activity.description}</p>

                    {activity.images.length > 0 && (
                      <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {activity.images.map((image, idx) => (
                          <div key={idx} className="relative group overflow-hidden rounded-lg">
                            <Image
                              src={image}
                              alt={`Activity image ${idx + 1}`}
                              className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <Button
                                isIconOnly
                                variant="light"
                                className="text-white"
                                onPress={() => window.open(image, '_blank')}
                              >
                                <Camera className="w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </CardBody>
                </Card>
              </div>
            </motion.div>
          );
        })}
      </div>

      <ActivityForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
}