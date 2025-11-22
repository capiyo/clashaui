import { useState } from "react";
import { Contact } from "@/pages/types/Contact";
import ContactCard from "./ContactCard";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - In a real app, this would come from an API
  const contacts: Contact[] = [
    {
      id: "1",
      username: "Sarah Johnson",
      gmail: "sarah.johnson@gmail.com",
      skill: "React Developer",
      avatar: "",
      status: "online",
    },
    {
      id: "2",
      username: "Michael Chen",
      gmail: "michael.chen@gmail.com",
      skill: "UI/UX Designer",
      avatar: "",
      status: "online",
    },
    {
      id: "3",
      username: "Emily Rodriguez",
      gmail: "emily.rodriguez@gmail.com",
      skill: "Product Manager",
      avatar: "",
      status: "busy",
    },
    {
      id: "4",
      username: "David Kim",
      gmail: "david.kim@gmail.com",
      skill: "Backend Engineer",
      avatar: "",
      status: "offline",
      lastSeen: "2 hours ago",
    },
    {
      id: "5",
      username: "Jessica Taylor",
      gmail: "jessica.taylor@gmail.com",
      skill: "Data Scientist",
      avatar: "",
      status: "online",
    },
    {
      id: "6",
      username: "Alex Martinez",
      gmail: "alex.martinez@gmail.com",
      skill: "DevOps Engineer",
      avatar: "",
      status: "offline",
      lastSeen: "1 day ago",
    },
    {
      id: "7",
      username: "Lisa Wong",
      gmail: "lisa.wong@gmail.com",
      skill: "Marketing Lead",
      avatar: "",
      status: "online",
    },
    {
      id: "8",
      username: "Tom Anderson",
      gmail: "tom.anderson@gmail.com",
      skill: "Full Stack Dev",
      avatar: "",
      status: "busy",
    },
  ];

  const filteredContacts = contacts.filter((contact) =>
    contact.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.gmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProfile = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    toast({
      title: "Opening Profile",
      description: `Viewing profile for ${contact?.username}`,
    });
  };

  const handleAssignTask = (id: string) => {
    const contact = contacts.find(c => c.id === id);
    toast({
      title: "Task Assignment",
      description: `Opening task assignment for ${contact?.username}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
       
           
        

     



          
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {filteredContacts.map((contact, index) => (
            <div key={contact.id} style={{ animationDelay: `${0.5 + index * 0.1}s` }}>
              <ContactCard
                contact={contact}
                onViewProfile={handleViewProfile}
                onAssignTask={handleAssignTask}
              />
            </div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
              <p className="text-lg">No contacts found matching your search</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;