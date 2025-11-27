import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import stores from '@/data/stores.json';

interface Store {
  id: string;
  name: string;
  location: string;
  address: string;
  phone: string;
  hours: string;
  coordinates: { lat: number; lng: number };
}

export default function Stores() {
  const allStores = stores as Store[];

  const openGoogleMaps = (store: Store) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
    window.open(url, '_blank');
  };

  const callStore = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4" data-testid="stores-title">
            Our Stores
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Visit any of our premium liquor stores across Kenya. 
            Find your nearest location for in-store shopping or pickup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="stores-grid">
          {allStores.map(store => (
            <div
              key={store.id}
              className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-colors"
              data-testid={`store-card-${store.id}`}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <MapPin className="h-16 w-16 text-primary/50" />
              </div>
              
              <div className="p-6">
                <h2 className="font-serif text-xl font-bold text-white mb-2">
                  {store.name}
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{store.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{store.phone}</span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground text-sm">{store.hours}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => callStore(store.phone)}
                    className="flex-1 border-border text-muted-foreground hover:text-white gap-2"
                    data-testid={`call-store-${store.id}`}
                  >
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openGoogleMaps(store)}
                    className="flex-1 gap-2"
                    data-testid={`directions-${store.id}`}
                  >
                    <Navigation className="h-4 w-4" />
                    Directions
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-card rounded-2xl border border-border p-8 lg:p-12" data-testid="delivery-info">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-4">
              Delivery Available
            </h2>
            <p className="text-muted-foreground mb-6">
              Can't make it to the store? We offer delivery services across Nairobi and major towns in Kenya. 
              Order via WhatsApp and have your favorite drinks delivered to your doorstep.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-primary mb-2">Same Day</div>
                <p className="text-sm text-muted-foreground">Delivery in Nairobi</p>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary mb-2">24-48 hrs</div>
                <p className="text-sm text-muted-foreground">Countrywide delivery</p>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-primary mb-2">Free</div>
                <p className="text-sm text-muted-foreground">Orders over KSh 10,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
