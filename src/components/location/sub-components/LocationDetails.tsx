import { MapPin, Users } from 'lucide-react';
import { CardInfoRow } from '../../shared/card/CardInfoRow';

interface LocationDetailsProps {
  type?: string;
  residentsCount: number;
}

export function LocationDetails({ type, residentsCount }: LocationDetailsProps) {
  const residentsText =
    residentsCount === 0
      ? 'Uninhabited'
      : residentsCount === 1
        ? '1 Lifeform'
        : `${residentsCount} Lifeforms`;

  return (
    <div className="space-y-3">
      <CardInfoRow icon={MapPin} label="Classification" value={type || 'Unknown'} />
      <CardInfoRow icon={Users} label="Population" value={residentsText} />
    </div>
  );
}
