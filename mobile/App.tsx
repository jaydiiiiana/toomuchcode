import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WelcomeScreen from "./app/welcome/page";
import LoginPage from "./app/login/page";
import SignUpPage from "./app/sign up/page";
import MainPage from "./app/main/page";
import QuestionPage from "./app/question/page";
import ConsultationPage from "./app/consultation/page";
import DocumentPage from "./app/document/page";
import EmergencyPage from "./app/emergency/page";
import AdminPage from "./app/admin/page";
import AttyPage from "./app/atty/page";
import {
  getActiveSession,
  saveActiveSession,
  clearActiveSession,
} from "./app/services/sessionService";
import { logoutFirebase } from "./app/services/firebaseAuthService";

type Screen =
  | "welcome"
  | "login"
  | "signup"
  | "main"
  | "question"
  | "consultation"
  | "document"
  | "emergency"
  | "admin"
  | "atty";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [loggedInEmail, setLoggedInEmail] = useState<string>("");
  const [isCheckingSession, setIsCheckingSession] = useState<boolean>(true);

  // Restore active user session on app launch
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const session = await getActiveSession();
        if (isMounted && session && session.email) {
          setLoggedInEmail(session.email);
          if (session.role === "admin" || session.email.toLowerCase() === "admin@lexora.ph") {
            setCurrentScreen("admin");
          } else if (session.role === "attorney") {
            setCurrentScreen("atty");
          } else {
            setCurrentScreen("main");
          }
        }
      } catch (err) {
        console.warn("[App] Failed to restore session:", err);
      } finally {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await clearActiveSession();
      await logoutFirebase();
    } catch (e) {
      console.warn("[App] Logout error:", e);
    }
    setLoggedInEmail("");
    setCurrentScreen("welcome");
  };

  if (isCheckingSession) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

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
          onLoginSuccess={async (email, role) => {
            const detectedRole =
              role || (email.toLowerCase() === "admin@lexora.ph" ? "admin" : "client");
            setLoggedInEmail(email);

            // Persist session across app closes
            await saveActiveSession(email, detectedRole);

            if (detectedRole === "admin") {
              setCurrentScreen("admin");
            } else if (detectedRole === "attorney") {
              setCurrentScreen("atty");
            } else {
              setCurrentScreen("main");
            }
          }}
        />
      )}
      {currentScreen === "signup" && (
        <SignUpPage
          onNavigateToLogin={() => setCurrentScreen("login")}
          onSignUpSuccess={async (userData) => {
            const userRole = userData.role || "client";
            setLoggedInEmail(userData.email);

            // Persist session across app closes
            await saveActiveSession(userData.email, userRole, userData.name);

            if (userRole === "attorney") {
              setCurrentScreen("atty");
            } else {
              setCurrentScreen("main");
            }
          }}
        />
      )}
      {currentScreen === "main" && (
        <MainPage
          onLogout={handleLogout}
          onOpenScreen={(screen) => setCurrentScreen(screen)}
        />
      )}
      {currentScreen === "admin" && (
        <AdminPage onLogout={handleLogout} />
      )}
      {currentScreen === "atty" && (
        <AttyPage userEmail={loggedInEmail} onLogout={handleLogout} />
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

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
