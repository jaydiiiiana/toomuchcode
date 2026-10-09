import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import WelcomeScreen from "./app/welcome/page";
import LoginPage from "./app/login/page";
import SignUpPage from "./app/sign up/page";
import MainPage from "./app/main/page";
import QuestionPage from "./app/question/page";
import ConsultationPage from "./app/consultation/page";
import DocumentPage from "./app/document/page";
import EmergencyPage from "./app/emergency/page";

type Screen =
  | "welcome"
  | "login"
  | "signup"
  | "main"
  | "question"
  | "consultation"
  | "document"
  | "emergency";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {currentScreen === "welcome" && (
        <WelcomeScreen
          onLogin={() => setCurrentScreen("login")}
          onSignUp={() => setCurrentScreen("signup")}
        />
      )}
      {currentScreen === "login" && (
        <LoginPage
          onNavigateToSignUp={() => setCurrentScreen("signup")}
          onLoginSuccess={(email) => {
            console.log("Logged in successfully:", email);
            setCurrentScreen("main");
          }}
        />
      )}
      {currentScreen === "signup" && (
        <SignUpPage
          onNavigateToLogin={() => setCurrentScreen("login")}
          onSignUpSuccess={(userData) => {
            console.log("Registered successfully:", userData);
            setCurrentScreen("main");
          }}
        />
      )}
      {currentScreen === "main" && (
        <MainPage
          onLogout={() => setCurrentScreen("welcome")}
          onOpenScreen={(screen) => setCurrentScreen(screen)}
        />
      )}
      {currentScreen === "question" && (
        <QuestionPage
          onBack={() => setCurrentScreen("main")}
          onNavigateAction={(action) => {
            if (action === "consult") setCurrentScreen("consultation");
            else if (action === "document") setCurrentScreen("document");
            else if (action === "emergency") setCurrentScreen("emergency");
          }}
        />
      )}
      {currentScreen === "consultation" && (
        <ConsultationPage onBack={() => setCurrentScreen("main")} />
      )}
      {currentScreen === "document" && (
        <DocumentPage onBack={() => setCurrentScreen("main")} />
      )}
      {currentScreen === "emergency" && (
        <EmergencyPage onBack={() => setCurrentScreen("main")} />
      )}
    </SafeAreaProvider>
  );
}
