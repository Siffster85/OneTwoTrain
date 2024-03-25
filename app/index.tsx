import { Redirect } from "expo-router"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { router } from "expo-router";


const IndexPage = () => {

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // should be moved to global context
      router.replace("/(tabs)/plan")
    } else {
      router.replace("/(auth)/signup")
    }
  });
}
export default IndexPage;