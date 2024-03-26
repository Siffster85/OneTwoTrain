import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";

export default function IndexPage() {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      router.replace("/(tabs)/plan/")
    } else {
      router.replace("/(auth)")
    }
  });
}
