import { Contact } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Briefcase, Eye } from "lucide-react";

interface ContactCardProps {
  contact: Contact;
  onViewProfile: (id: string) => void;
  onAssignTask: (id: string) => void;
}

const ContactCard = ({ contact, onViewProfile, onAssignTask }: ContactCardProps) => {
  return (
    <div className="bg-gradient-card p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg animate-fade-in group">
      <div className="flex items-start gap-4">
        {/* Avatar Section */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg shadow-md">
            {contact.avatar ? (
              <img src={contact.avatar} alt={contact.username} className="w-full h-full rounded-full object-cover" />
            ) : (
              contact.username.slice(0, 2).toUpperCase()
            )}
          </div>
          <span 
            className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-card ${
              contact.status === 'online' ? 'bg-status-online animate-pulse-soft' : 
              contact.status === 'busy' ? 'bg-status-busy' : 
              'bg-status-offline'
            }`} 
          />
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <User className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
              {contact.username}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 mb-3 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <p className="text-sm truncate">{contact.gmail}</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <Briefcase className="w-3 h-3 mr-1" />
              {contact.skill}
            </Badge>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              
              size="sm" 
              onClick={() => onViewProfile(contact.id)}
              className="flex-1"
            >
              <Eye className="w-4 h-4" />
              View Profile
            </Button>
            <Button 
              
              size="sm" 
              onClick={() => onAssignTask(contact.id)}
              className="flex-1"
            >
              <Briefcase className="w-4 h-4" />
              Assign Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;