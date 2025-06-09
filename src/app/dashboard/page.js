import App from "@/clients/components/dashboard/Index";
import React from "react";
import ChatBot from "@/clients/components/ChatApp/ChatBot";
import { ChatInterface } from "@/clients/components/ChatApp/ChatInterface";

const page = () => {
  return (
    <div>
      <App />

      <ChatInterface />
    </div>
  );
};

export default page;
