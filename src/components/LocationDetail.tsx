import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MapPin, Globe, Users, Earth, Calendar, ArrowRight } from 'lucide-react';
import { Location, Character } from '~/types/api';
import { apiClient } from '~/lib/api-client';
import { GoBackButton } from './shared/GoBackButton';

interface LocationDetailProps {
  id: string;
}

export function LocationDetail({ id }: LocationDetailProps) {
  const router = useRouter();
  const [location, setLocation] = useState<Location | null>(null);
  const [residents, setResidents] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLocationAndResidents = async () => {
      try {
        setLoading(true);
        const locationData = await apiClient.locations.getById(id);
        if (!isMounted) return;
        setLocation(locationData);

        if (locationData.residents.length > 0) {
          const residentIds = locationData.residents
            .map(url => {
              const parts = url.split('/');
              return parseInt(parts[parts.length - 1]);
            })
            .filter(id => !isNaN(id));

          if (residentIds.length > 0) {
            const residentsData = await apiClient.characters.getMultiple(residentIds);
            if (isMounted) {
              setResidents(residentsData);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching location:', err);
        if (isMounted) {
          setError('Failed to load location details');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLocationAndResidents();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading location details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !location) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="h-12 w-12 text-red-500 mx-auto mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Location Not Found</h2>
          <p className="text-gray-600 mb-6">
            {error || 'This location does not exist in this dimension.'}
          </p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <GoBackButton />

      {/* Location Header */}
      <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">{location.name}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Earth className="h-5 w-5" />
                <span className="font-medium">Location in the Multiverse</span>
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <InfoItem
              icon={<Globe className="h-5 w-5" />}
              label="Dimension"
              value={location.dimension || 'Unknown'}
            />
            <InfoItem
              icon={<MapPin className="h-5 w-5" />}
              label="Type"
              value={location.type || 'Unknown'}
            />
          </div>
          <div className="space-y-6">
            <InfoItem
              icon={<Users className="h-5 w-5" />}
              label="Total Residents"
              value={location.residents.length.toString()}
            />
            <InfoItem
              icon={<Calendar className="h-5 w-5" />}
              label="Created"
              value={new Date(location.created).toLocaleDateString()}
            />
          </div>
        </div>
      </div>

      {/* Residents Section */}
      {residents.length > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Residents ({residents.length})</h2>
            <div className="text-sm text-gray-500">Click on a resident to view their details</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {residents.map(character => (
              <div
                key={character.id}
                className="group border border-gray-200 rounded-xl p-4 hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                onClick={() => router.push(`/characters/${character.id}`)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {character.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <span>{character.species}</span>
                      <span>•</span>
                      <span className="font-medium">{character.status}</span>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Residents Message */}
      {residents.length === 0 && (
        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Residents Found</h3>
          <p className="text-gray-600 mb-4">
            This location appears to be uninhabited in this timeline.
          </p>
        </div>
      )}
    </div>
  );
}

// Helper component
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gray-100 rounded-lg text-gray-600">{icon}</div>
      <div className="flex-1">
        <div className="text-sm text-gray-500 font-medium">{label}</div>
        <div className="text-lg font-semibold text-gray-900">{value}</div>
      </div>
    </div>
  );
}
