import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Input,
  Button,
  Avatar,
} from '@nextui-org/react';
import { Camera, Mail, Phone, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateProfile(formData);
      navigate('/');
    } catch (error) {
      console.error('Profile update failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData({ ...formData, avatar: event.target.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardBody className="space-y-8 p-8">
          <div>
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Update informasi profil Anda
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar
                  src={formData.avatar}
                  className="w-24 h-24"
                  showFallback
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                >
                  <Camera className="w-4 h-4 text-white" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <p className="text-sm text-gray-500">
                Klik ikon kamera untuk mengganti foto profil
              </p>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                label="Nama"
                placeholder="Masukkan nama"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                startContent={<User className="w-4 h-4 text-gray-400" />}
              />

              <Input
                type="email"
                label="Email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                startContent={<Mail className="w-4 h-4 text-gray-400" />}
              />

              <Input
                type="tel"
                label="Nomor Telepon"
                placeholder="Masukkan nomor telepon"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                startContent={<Phone className="w-4 h-4 text-gray-400" />}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                variant="light"
                onPress={() => navigate('/')}
              >
                Batal
              </Button>
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
              >
                Simpan
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}