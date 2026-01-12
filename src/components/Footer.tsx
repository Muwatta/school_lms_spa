import { schoolInfo } from '../data/schoolInfo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} {schoolInfo.name}. All rights reserved.</p>
        <a href={schoolInfo.whatsappLink} className="text-green-300">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;