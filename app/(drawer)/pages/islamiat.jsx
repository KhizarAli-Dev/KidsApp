import {
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
} from "react-native";
import * as Speech from "expo-speech";
import { useState } from "react";

const kalmas = [
  {
    title: "پہلا کلمہ (طیب)",
    arabic: "لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَسُولُ اللهِ",
    urdu: "اللہ کے سوا کوئی معبود نہیں، محمد صلی اللہ علیہ وسلم اللہ کے رسول ہیں۔",
  },
  {
    title: "دوسرا کلمہ (شہادت)",
    arabic:
      "أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ",
    urdu: "میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں، اور میں گواہی دیتا ہوں کہ محمد صلی اللہ علیہ وسلم اللہ کے بندے اور رسول ہیں۔",
  },
  {
    title: "تیسرا کلمہ (تمجید)",
    arabic:
      "سُبْحَانَ اللهِ وَالْحَمْدُ لِلّهِ وَلَا إِلٰهَ إِلَّا اللهُ وَاللهُ أَكْبَرُ",
    urdu: "اللہ پاک ہے، تمام تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں، اور اللہ سب سے بڑا ہے۔",
  },
];

const surahs = [
  {
    title: "بسم اللہ",
    arabic: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ",
    urdu: "اللہ کے نام سے جو نہایت مہربان، رحم والا ہے۔",
  },
  {
    title: "اعوذ باللہ",
    arabic: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    urdu: "میں پناہ مانگتا ہوں اللہ کی شیطان مردود سے۔",
  },
  {
    title: "سورۃ الفاتحہ",
    arabic: `ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ 
ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ 
مَـٰلِكِ يَوْمِ ٱلدِّينِ 
إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ 
ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ 
صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ 
غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ`,
    urdu: "تمام تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا رب ہے...",
  },
  {
    title: "سورۃ الاخلاص",
    arabic: `قُلْ هُوَ ٱللَّهُ أَحَدٌ
ٱللَّهُ ٱلصَّمَدُ
لَمْ يَلِدْ وَلَمْ يُولَدْ
وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌ`,
    urdu: "کہہ دیجیے! وہ اللہ ایک ہے، اللہ بے نیاز ہے...",
  },
];

const duas = [
  {
    title: "سونے کی دعا",
    arabic: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
    urdu: "اے اللہ! میں تیرے نام کے ساتھ مرتا ہوں اور جیتا ہوں۔",
  },
  {
    title: "صبح کی دعا",
    arabic: "اللّهُـمَّ أَنْتَ رَبِّي لا إِلَهَ إِلّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ",
    urdu: "اے اللہ! تو میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں۔",
  },
  {
    title: "کھانے کی دعا",
    arabic: "اللّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
    urdu: "اے اللہ! جو تو نے ہمیں دیا ہے اس میں برکت دے اور ہمیں دوزخ کے عذاب سے بچا۔",
  },
  {
    title: "نکلنے کی دعا",
    arabic: "بِسْمِ اللَّهِ، تَوَكَّلتُ عَلَى اللَّهِ، وَلا حَوْلَ وَلا قُوَّةَ إِلَّا بِاللَّهِ",
    urdu: "اللہ کے نام سے (نکلتا ہوں)، میں اللہ پر بھروسہ کرتا ہوں، اور اللہ کے سوا کوئی طاقت اور قوت نہیں۔",
  },
  {
    title: "گھر میں داخل ہونے کی دعا",
    arabic: "بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا",
    urdu: "اللہ کے نام سے ہم داخل ہوئے اور اللہ کے نام سے نکلے، اور اپنے رب اللہ پر بھروسہ کیا۔",
  },
];

const Islamiat = () => {
  const [activeTab, setActiveTab] = useState("kalmas");

const speak = (arabic, urdu) => {
  Speech.stop(); // Stop any ongoing speech before starting a new one
  Speech.speak(arabic, {
    rate: 0.5,
    pitch: 1,
    language: "ar-SA",
    onDone: () => {
      Speech.speak(urdu, {
        rate: 0.6,
        pitch: 1,
        language: "ur-PK",
      });
    },
  });
};


  const dataToRender =
    activeTab === "kalmas" ? kalmas : activeTab === "surahs" ? surahs : duas;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: index % 2 === 0 ? "#FFFDE7" : "#E0F7FA" },
      ]}
      onPress={() => speak(item.arabic, item.urdu)}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>{item.title}</Text>
      <View style={styles.divider} />
      <Text style={styles.arabic}>{item.arabic}</Text>
      <Text style={styles.urdu}>{item.urdu}</Text>
      <Text style={styles.tapToHear}>🔊 سننے کے لیے دبائیں</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>
        📖 اسلامیات –{" "}
        {activeTab === "kalmas"
          ? "کلمے"
          : activeTab === "surahs"
          ? "سورتیں"
          : "دعائیں"}
      </Text>

      <FlatList
        data={dataToRender}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
      />

      <View style={styles.bottomNav}>
        <TouchableOpacity
          onPress={() => setActiveTab("kalmas")}
          style={[
            styles.navItem,
            activeTab === "kalmas" && styles.navItemActive,
          ]}
        >
          <Text style={styles.navText}>کلمے</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("surahs")}
          style={[
            styles.navItem,
            activeTab === "surahs" && styles.navItemActive,
          ]}
        >
          <Text style={styles.navText}>سورتیں</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab("duas")}
          style={[
            styles.navItem,
            activeTab === "duas" && styles.navItemActive,
          ]}
        >
          <Text style={styles.navText}>دعائیں</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Islamiat;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF8F0",
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#4E342E",
    backgroundColor: "#FFECB3",
    padding: 12,
    borderRadius: 12,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3E2723",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#BDBDBD",
    marginBottom: 10,
  },
  arabic: {
    fontSize: 22,
    textAlign: "right",
    color: "#00796B",
    marginBottom: 10,
    lineHeight: 30,
  },
  urdu: {
    fontSize: 17,
    color: "#444",
    textAlign: "right",
    lineHeight: 24,
    marginBottom: 10,
  },
  tapToHear: {
    fontSize: 14,
    textAlign: "right",
    fontStyle: "italic",
    color: "#D84315",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#6C63FF",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    padding: 10,
  },
  navItemActive: {
    borderBottomWidth: 3,
    borderBottomColor: "#E0F7FA",
  },
  navText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});
