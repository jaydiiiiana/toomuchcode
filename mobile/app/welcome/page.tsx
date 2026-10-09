import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WordmarkLogo from "./components/WordmarkLogo";
import RobotMascot from "./components/RobotMascot";
import WelcomeHero from "./components/WelcomeHero";
import GetStartedButton from "./components/GetStartedButton";
import TrustIndicators from "./components/TrustIndicators";
import AuthModal from "./components/AuthModal";
import { COLORS } from "./lib/constants";

interface WelcomeScreenProps {
  onLogin?: () => void;
  onSignUp?: () => void;
  onGetStarted?: () => void;
}

export default function WelcomeScreen({
  onLogin,
  onSignUp,
  onGetStarted,
}: WelcomeScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    if (onGetStarted) {
      onGetStarted();
    }
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleLogin = () => {
    setModalVisible(false);
    if (onLogin) {
      onLogin();
    } else {
      console.log("Login option selected");
    }
  };

  const handleSignUp = () => {
    setModalVisible(false);
    if (onSignUp) {
      onSignUp();
    } else {
      console.log("Sign Up option selected");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Top Center: Lexora Wordmark moved down */}
          <WordmarkLogo />

          {/* Mascot sticking flush to the left edge of the screen, moved down */}
          <RobotMascot />

          {/* Content with comfortable horizontal padding */}
          <View style={styles.content}>
            <WelcomeHero />
            <GetStartedButton onPress={handleOpenModal} />
            <TrustIndicators />
          </View>
        </ScrollView>

        {/* Modal: Login and Sign Up choices */}
        <AuthModal
          visible={modalVisible}
          onClose={handleCloseModal}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 28,
  },
  content: {
    width: "100%",
    paddingHorizontal: 26,
  },
});
