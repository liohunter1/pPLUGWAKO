import Layout from '@/components/layout/Layout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Legal() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button asChild variant="ghost" className="mb-8">
          <Link href="/" data-testid="back-button">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="space-y-8">
          <div>
            <h1 className="font-serif text-4xl font-bold text-white mb-4" data-testid="legal-title">
              Legal Notice
            </h1>
            <p className="text-muted-foreground">
              Please read this legal notice carefully before using pPLUGWAKO's services.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-8 space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6" data-testid="legal-notice-box">
              <h2 className="font-serif text-2xl font-bold text-white mb-4 flex items-start gap-3">
                <span className="text-amber-500 text-3xl leading-none">⚠️</span>
                <span>Important Legal Notice</span>
              </h2>
              
              <div className="text-muted-foreground space-y-4">
                <p className="text-sm leading-relaxed" data-testid="legal-notice-text">
                  <span className="font-semibold text-white block mb-2">Partnership & Platform Model:</span>
                  We partner with verified, licensed liquor retailers across Kenya. <span className="text-primary font-semibold">We do not manufacture, stock, or sell alcohol ourselves.</span> We simply provide a platform to help you access genuine products from reputable vendors.
                </p>

                <p className="text-sm leading-relaxed" data-testid="legal-age-requirement">
                  <span className="font-semibold text-white block mb-2">Age Requirement:</span>
                  Must be 18+ to order. All customers must meet the legal drinking age requirement in Kenya.
                </p>

                <p className="text-sm leading-relaxed" data-testid="legal-fulfillment">
                  <span className="font-semibold text-white block mb-2">Order Fulfillment:</span>
                  All deliveries are fulfilled by authorized retailers. Prices and availability are subject to change based on retailer inventory.
                </p>

                <p className="text-sm leading-relaxed" data-testid="legal-responsibility">
                  <span className="font-semibold text-white block mb-2">Responsible Consumption:</span>
                  Please drink responsibly. Do not drive while intoxicated. Alcohol consumption may be harmful to your health.
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6 space-y-6">
              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-3">Product Authenticity</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  All products available through pPLUGWAKO are sourced from authorized distributors and verified retailers. We guarantee the authenticity of all spirits, wines, beers, and beverages offered on our platform.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-3">Delivery & Prices</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Delivery times and final pricing are determined by the fulfilling retailer. Our platform connects you with these retailers, but does not directly control delivery logistics or pricing. Prices may vary based on location and retailer availability.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-white mb-3">Contact & Support</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  For questions about orders, products, or fulfillment, please contact our team via WhatsApp at <span className="text-primary font-semibold">0759565307</span> or visit one of our store locations across Nairobi.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-6 border border-border">
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
