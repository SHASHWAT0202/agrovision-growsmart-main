import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Bot, ExternalLink } from "lucide-react";
import { useState } from "react";

// Update this URL to point to your agrobot.html page
const AGROBOT_URL = "/agrobot.html";

const AIChat = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const openAgrobotPage = () => {
    // Open the agrobot.html page in a new tab
    window.open(AGROBOT_URL, "_blank");
  };

  return (
    <>
      {/* Floating Chat Widget - Opens external chatbot when clicked */}
      <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
        <Button
          onClick={openAgrobotPage}
          className="w-16 h-16 rounded-full shadow-glow animate-glow"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>

      {/* Section for main page */}
      <section id="chat" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <Badge variant="outline" className="mb-4">
              <MessageCircle className="w-4 h-4 mr-2" />
              AI Assistant
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Smart Farming Assistant
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant answers to your farming questions with our AI-powered chatbot.
            </p>
          </div>

          <div className="max-w-2xl mx-auto text-center animate-slide-in">
            <Card className="bg-gradient-card shadow-card border-0 p-8">
              <div className="space-y-6">
                <Bot className="h-16 w-16 text-primary mx-auto animate-glow" />
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Start Chatting Now!</h3>
                  <p className="text-muted-foreground">
                    Click the chat button to open our smart farming assistant and get answers
                    about farming, crop management, weather insights, and more.
                  </p>
                </div>
                <Button onClick={openAgrobotPage} className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Open AI Chat</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default AIChat;