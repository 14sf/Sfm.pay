import React from 'react';
import { useNavigation } from '../../contexts/NavigationContext';
import Home from './Home';
import ExchangeDashboard from '../exchange/ExchangeDashboard';
import { MessageSquare } from 'lucide-react';
import RealEstateMessenger from '../real-estate/messenger/RealEstateMessenger';
import BookDashboard from '../books/BookDashboard';
import PaymentDashboard from '../payment/PaymentDashboard';
import MarketDashboard from '../market/MarketDashboard';
import RealEstateManager from '../real-estate/RealEstateManager';
import BookingDashboard from '../booking/BookingDashboard';

const SectionRenderer: React.FC = () => {
  const { activeSection } = useNavigation();

  const sections = {
    home: Home,
    exchange: ExchangeDashboard,
    messages: RealEstateMessenger,
    sfmbook: BookDashboard,
    sfmpay: PaymentDashboard,
    sfmarket: MarketDashboard,
    sfmrealestate: RealEstateManager,
    sfmbooking: BookingDashboard
  };

  const Component = sections[activeSection] || Home;
  
  return <Component />;
};

export default SectionRenderer;